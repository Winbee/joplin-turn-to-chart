export enum ConfigKind {
  customLocale = 'customLocale',
  xAxisType = 'xAxisType',
  xAxisFormat = 'xAxisFormat',
  xAxisNbOfTicks = 'xAxisNbOfTicks',
  xAxisOrigin = 'xAxisOrigin',
  yAxisFormat = 'yAxisFormat',
  yAxisNbOfTicks = 'yAxisNbOfTicks',
  yAxisOrigin = 'yAxisOrigin',
}

export type ConfigMap = Map<ConfigKind, string>;

export enum AxisOriginKind {
  fromZero = 'from zero',
  fromDataBoundaries = 'from data boundaries',
}
