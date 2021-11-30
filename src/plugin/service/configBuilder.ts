import { AxisOriginKind, ConfigKind, ConfigMap, LegendOrientation } from '../model/ConfigData';
import { DataType } from '../model/GraphData';
import { isNumber } from './utils';

export const buildConfigData = (configList: string[]): ConfigMap => {
  const configMap = new Map();

  configList.forEach((item) => {
    const separatorIndex = item.indexOf(':');
    const key = item.substr(0, separatorIndex).trim();
    const value = item.substr(separatorIndex + 1).trim();
    if (key && value) {
      let finalKey: ConfigKind | undefined;
      let finalValue;
      switch (key) {
        case ConfigKind.customLocale: {
          finalKey = key;
          finalValue = value;
          break;
        }
        case ConfigKind.legendOrientation: {
          finalKey = key;
          finalValue = Object.values(LegendOrientation).find((item) => item === value);
          break;
        }
        case ConfigKind.legendTitle: {
          finalKey = key;
          finalValue = value;
          break;
        }
        case ConfigKind.xAxisType: {
          finalKey = key;
          finalValue = Object.values(DataType).find((item) => item === value);
          break;
        }
        case ConfigKind.xAxisFormat: {
          finalKey = key;
          finalValue = value;
          break;
        }
        case ConfigKind.xAxisNbOfTicks: {
          finalKey = key;
          if (isNumber(+value)) {
            finalValue = value;
          }
          break;
        }
        case ConfigKind.xAxisOrigin: {
          finalKey = key;
          finalValue = Object.values(AxisOriginKind).find((item) => item === value);
          break;
        }
        case ConfigKind.yAxisFormat: {
          finalKey = key;
          finalValue = value;
          break;
        }
        case ConfigKind.yAxisOrigin: {
          finalKey = key;
          finalValue = Object.values(AxisOriginKind).find((item) => item === value);
          break;
        }
        case ConfigKind.yAxisNbOfTicks: {
          finalKey = key;
          if (isNumber(+value)) {
            finalValue = value;
          }
          break;
        }
      }
      if (!configMap.has(finalKey) && finalKey && finalValue) {
        configMap.set(finalKey, finalValue);
      }
    }
  });

  return configMap;
};
