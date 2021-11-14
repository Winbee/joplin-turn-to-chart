export enum ConfigKind {
  xAxisType = 'xAxisType',
  xAxisFormat = 'xAxisFormat',
  yAxisFormat = 'yAxisFormat',
  xAxisOrigin = 'xAxisOrigin',
  yAxisOrigin = 'yAxisOrigin',
}

export type ConfigMap = Map<ConfigKind, string>;

export enum AxisOriginKind {
  fromZero = 'from zero',
  fromDataBoundaries = 'from data boundaries',
}
