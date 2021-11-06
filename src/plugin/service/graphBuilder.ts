import { DataType, GraphData, Point, Serie, XType } from '../model/GraphData';
import { TableData } from '../model/TableData';

const LABEL_WITH_UNIT_REGEX = /(.*?)\((.*?)\)/;

const isNumber = (value: any) => {
  return typeof value === 'number' && isFinite(value);
};

const isDate = (value: any) => {
  return value instanceof Date && !isNaN(value.valueOf());
};

export const buildGraphData = (tableData: TableData): GraphData | undefined => {
  const graphData: GraphData = {
    serieList: [],
    xAxis: {
      label: '',
      dataType: DataType.number,
      domain: [],
    },
    yAxis: {
      label: '',
      dataType: DataType.number,
      domain: [],
    },
  };

  tableData.headList.forEach((item, index) => {
    const regexResult = LABEL_WITH_UNIT_REGEX.exec(item);
    if (index === 0) {
      graphData.xAxis.label = regexResult ? regexResult[1].trim() : item.trim();
      const type = regexResult ? regexResult[2].trim().toLocaleLowerCase() : '';
      switch (type) {
        case DataType.number: {
          graphData.xAxis.dataType = DataType.number;
          break;
        }
        case DataType.date: {
          graphData.xAxis.dataType = DataType.date;
          break;
        }
        case DataType.category: {
          graphData.xAxis.dataType = DataType.category;
          break;
        }
        default: {
          graphData.xAxis.label = item.trim();
          // We don't know the type of the x-axis, we will guess it with the first value of the first row
          const firstValue = tableData.rowList[0][0];
          if (isNumber(+firstValue)) {
            graphData.xAxis.dataType = DataType.number;
          } else if (isDate(new Date(firstValue))) {
            graphData.xAxis.dataType = DataType.date;
          } else {
            graphData.xAxis.dataType = DataType.category;
          }
        }
      }
    } else {
      const newSerie: Serie = {
        name: regexResult ? regexResult[1].trim() : item.trim(),
        unit: regexResult ? regexResult[2].trim() : undefined,
        pointList: [],
      };
      graphData.serieList.push(newSerie);
    }
  });

  const unitList = [
    ...new Set(graphData.serieList.filter((item) => item.unit).map((item) => item.unit)),
  ];
  graphData.yAxis.label = unitList.join(', ');

  let yMin, yMax, xMin, xMax;
  for (let rowIndex = 0; rowIndex < tableData.rowList.length; rowIndex++) {
    const currentRow = tableData.rowList[rowIndex];
    let x: XType;
    switch (graphData.xAxis.dataType) {
      case DataType.number: {
        x = +currentRow[0];
        xMin = xMin ? Math.min(x, xMin as number) : x;
        xMax = xMax ? Math.max(x, xMax as number) : x;
        break;
      }
      case DataType.date: {
        x = new Date(currentRow[0]);
        xMin = xMin ? (xMin < x ? xMin : x) : x;
        xMax = xMax ? (xMax < x ? x : xMax) : x;
        break;
      }
      case DataType.category: {
        x = currentRow[0].trim();
        graphData.xAxis.domain.push(x);
        break;
      }
      default: {
        throw new Error('Unknown DataType');
      }
    }

    for (let columnIndex = 1; columnIndex < currentRow.length; columnIndex++) {
      const y = +currentRow[columnIndex];
      const newPoint: Point = {
        x,
        y,
      };
      graphData.serieList[columnIndex - 1].pointList.push(newPoint);
      yMin = yMin ? Math.min(y, yMin) : y;
      yMax = yMax ? Math.max(y, yMax) : y;
    }
  }

  const zeroShouldAppearOnXAxis = tableData.delimiter[0].includes(':');
  if (graphData.xAxis.dataType === DataType.number && zeroShouldAppearOnXAxis) {
    if (xMin > 0) {
      xMin = 0;
    } else if (xMax < 0) {
      xMax = 0;
    }
  }

  const zeroShouldAppearOnYAxis = tableData.delimiter.slice(1).some((item) => item.includes(':'));
  if (zeroShouldAppearOnYAxis) {
    if (yMin > 0) {
      yMin = 0;
    } else if (yMax < 0) {
      yMax = 0;
    }
  }
  if (graphData.xAxis.dataType === DataType.number || graphData.xAxis.dataType === DataType.date) {
    graphData.xAxis.domain = [xMin, xMax];
  }
  graphData.yAxis.domain = [yMin, yMax];

  return graphData;
};
