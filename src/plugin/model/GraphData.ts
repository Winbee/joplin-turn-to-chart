export interface GraphData {
  serieList: Serie[];
  xAxis: {
    label: string;
    dataType: DataType;
    domain: XType[];
  };
  yAxis: {
    label: string;
    dataType: DataType;
    domain: YType[];
  };
}

export interface Serie {
  name: string;
  unit?: string;
  pointList: Point[];
}

export interface Point {
  x: XType;
  y: YType;
}

export enum DataType {
  number = 'number',
  date = 'date',
  category = 'category',
}

export type XType = number | Date | string;
export type YType = number;
