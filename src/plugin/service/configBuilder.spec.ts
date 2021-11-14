import { ConfigKind, ConfigMap } from '../model/ConfigData';
import { buildConfigData } from './configBuilder';

describe('stringReader', () => {
  describe('extractTableData', () => {
    const cases: { title: string; input: string[]; expectedOutput: ConfigMap | undefined }[] = [
      {
        title: 'unknown config key',
        input: [
          'unknown config key 1 : a config value',
          'unknown config key 2: another config value',
        ],
        expectedOutput: new Map(),
      },
      {
        title: 'malformated config',
        input: [
          'no separator',
          'too much : separator :',
          'key with no value :',
          ': value with no key',
          ':',
        ],
        expectedOutput: new Map(),
      },
      {
        title: 'valid xAxisType config key',
        input: ['xAxisType : category'],
        expectedOutput: new Map([[ConfigKind.xAxisType, 'category']]),
      },
      {
        title: 'valid yAxisOrigin config key',
        input: ['yAxisOrigin: from zero'],
        expectedOutput: new Map([[ConfigKind.yAxisOrigin, 'from zero']]),
      },
    ];

    test.each(cases)('return expected value for $title', ({ input, expectedOutput }) => {
      const output = buildConfigData(input);

      expect(output).toEqual(expectedOutput);
    });
  });
});
