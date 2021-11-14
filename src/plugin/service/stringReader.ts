// Inspired from https://github.com/markdown-it/markdown-it/blob/master/lib/rules_block/table.js

import { TableData } from '../model/TableData';

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

function escapedSplit(str) {
  const result = [];
  let pos = 0;
  const max = str.length;
  let ch;
  let isEscaped = false;
  let lastPos = 0;
  let current = '';

  ch = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x7c /* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = ch === 0x5c /* \ */;
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result;
}

export function extractTableData(content: string): TableData | undefined {
  const lineList = content
    .trim()
    .split(/\r\n|\n\r|\n|\r/)
    .map((item) => item.trim());
  const startLine = 0;
  const endLine = lineList.length - 1;

  let ch;
  let lineText;
  let pos;
  let i;
  let nextLine;
  let columns;
  let columnCount;
  let t;
  let firstCh;
  let secondCh;

  // should have at least two lines
  if (lineList.length < 2) {
    return undefined;
  }

  nextLine = startLine + 1;

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = 0;
  if (pos + 1 > lineList[nextLine].length) {
    return undefined;
  }

  firstCh = lineList[nextLine].charCodeAt(pos++);
  if (firstCh !== 0x7c /* | */ && firstCh !== 0x2d /* - */ && firstCh !== 0x3a /* : */) {
    return undefined;
  }

  if (pos + 1 > lineList[nextLine].length) {
    return undefined;
  }
  secondCh = lineList[nextLine].charCodeAt(pos++);
  if (
    secondCh !== 0x7c /* | */ &&
    secondCh !== 0x2d /* - */ &&
    secondCh !== 0x3a /* : */ &&
    !isSpace(secondCh)
  ) {
    return undefined;
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2d /* - */ && isSpace(secondCh)) {
    return undefined;
  }
  while (pos < lineList[nextLine].length) {
    ch = lineList[nextLine].charCodeAt(pos);

    if (ch !== 0x7c /* | */ && ch !== 0x2d /* - */ && ch !== 0x3a /* : */ && !isSpace(ch)) {
      return undefined;
    }

    pos++;
  }

  lineText = lineList[nextLine];
  columns = lineText.split('|');
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return undefined;
      }
    }

    if (!/^:?-+:?$/.test(t)) {
      return undefined;
    }
  }

  lineText = lineList[startLine].trim();
  if (lineText.indexOf('|') === -1) {
    return undefined;
  }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table
  columnCount = columns.length;
  if (columnCount === 0) {
    return undefined;
  }

  let headList: string[];
  let delimiter: string[];
  const rowList: string[][] = [];
  // We read the table content
  for (nextLine = startLine; nextLine <= endLine; nextLine++) {
    lineText = lineList[nextLine].trim();
    if (!lineText) {
      break;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') {
      columns.shift();
    }
    if (columns.length && columns[columns.length - 1] === '') {
      columns.pop();
    }

    const cellList = [];
    for (i = 0; i < columnCount; i++) {
      cellList.push(columns[i] ? columns[i].trim() : '');
    }
    if (nextLine === 0) {
      headList = cellList;
    } else if (nextLine === 1) {
      delimiter = cellList;
    } else {
      rowList.push(cellList);
    }
  }

  const configList: string[] = [];
  const startLineConfig = nextLine + 1;
  // We read the config section
  for (nextLine = startLineConfig; nextLine <= endLine; nextLine++) {
    lineText = lineList[nextLine].trim();
    if (lineText) {
      configList.push(lineText);
    }
  }

  return {
    headList,
    delimiter,
    rowList,
    configList,
  };
}
