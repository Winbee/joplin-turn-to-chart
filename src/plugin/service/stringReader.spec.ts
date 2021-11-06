import { TableData } from '../model/TableData';
import { extractTableData } from './stringReader';

describe('stringReader', () => {
  describe('extractTableData', () => {
    const expectedOutput: TableData = {
      headList: ['title1', 'title2'],
      delimiter: [':------', '------'],
      rowList: [['cell A1', 'cell B1']],
    };
    const cases: { title: string; input: string; expectedOutput: TableData | undefined }[] = [
      {
        title: 'an string made of empty lines',
        input: `

      `,
        expectedOutput: undefined,
      },
      {
        title: 'an ideal table',
        input: `
      | title1  | title2  |
      | :------ | ------ |
      | cell A1 | cell B1 |
      | cell A2 | cell B2 |
      | cell A3 | cell B3 |
      `,
        expectedOutput: {
          headList: ['title1', 'title2'],
          delimiter: [':------', '------'],
          rowList: [
            ['cell A1', 'cell B1'],
            ['cell A2', 'cell B2'],
            ['cell A3', 'cell B3'],
          ],
        },
      },
      {
        title: 'a table with connected delimiters',
        input: `
      | title1 | title2 |
      | :------| ------|
      | cell A1| cell B1 |
      `,
        expectedOutput,
      },
      {
        title: 'a table with extra spaces',
        input: `
         | title1 | title2 |
      | :------| ------|
        | cell A1       | cell B1 |
      `,
        expectedOutput,
      },
      {
        title: 'empty lines followed by a table',
        input: `


        | title1|title2 |
        | :------|------ |
        |cell A1   | cell B1 |


      `,
        expectedOutput,
      },
    ];

    test.each(cases)('return expected value for $title', ({ input, expectedOutput }) => {
      const output = extractTableData(input);

      expect(output).toEqual(expectedOutput);
    });
  });
});
