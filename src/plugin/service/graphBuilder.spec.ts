import { DataType, GraphData } from '../model/GraphData';
import { TableData } from '../model/TableData';
import { buildGraphData } from './graphBuilder';

describe('graphBuilder', () => {
  describe('buildGraphData', () => {
    const cases: { title: string; input: TableData; expectedOutput: GraphData }[] = [
      {
        title: 'one serie with x-axis starting at zero',
        input: {
          headList: ['xLabel', 'serie1 (kilo)'],
          delimiter: [':------', '------'],
          rowList: [
            ['10', '2'],
            ['20', '4'],
            ['30', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.number,
            domain: [0, 30],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [2, 8],
          },
        },
      },
      {
        title: 'one serie with y-axis starting at zero',
        input: {
          headList: ['xLabel', 'serie1 (kilo)'],
          delimiter: ['------', ':------'],
          rowList: [
            ['10', '2'],
            ['20', '4'],
            ['30', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.number,
            domain: [10, 30],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one serie with both axis starting at zero',
        input: {
          headList: ['xLabel', 'serie1 (kilo)'],
          delimiter: [':------', ':------'],
          rowList: [
            ['10', '2'],
            ['20', '4'],
            ['30', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.number,
            domain: [0, 30],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one serie with x-with-unit',
        input: {
          headList: ['xLabel (unit)', 'serie1 (kilo)'],
          delimiter: ['------', '------'],
          rowList: [['10', '2']],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [{ x: 10, y: 2 }],
            },
          ],
          xAxis: {
            label: 'xLabel (unit)',
            dataType: DataType.number,
            domain: [10, 10],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [2, 2],
          },
        },
      },
      {
        title: 'one time-serie',
        input: {
          headList: ['xLabel (date)', 'serie1 (kilo)'],
          delimiter: ['------', ':------'],
          rowList: [
            ['2021-01-02', '2'],
            ['2021-03-02', '4'],
            ['2021-04-02', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: new Date('2021-01-02'), y: 2 },
                { x: new Date('2021-03-02'), y: 4 },
                { x: new Date('2021-04-02'), y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.date,
            domain: [new Date('2021-01-02'), new Date('2021-04-02')],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one time-serie by guessing',
        input: {
          headList: ['xLabel', 'serie1 (kilo)'],
          delimiter: ['------', ':------'],
          rowList: [
            ['2021-01-02', '2'],
            ['2021-03-02', '4'],
            ['2021-04-02', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: new Date('2021-01-02'), y: 2 },
                { x: new Date('2021-03-02'), y: 4 },
                { x: new Date('2021-04-02'), y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.date,
            domain: [new Date('2021-01-02'), new Date('2021-04-02')],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one category serie',
        input: {
          headList: ['xLabel (category)', 'serie1 (kilo)'],
          delimiter: ['------', '------'],
          rowList: [
            ['category 1', '2'],
            ['category 2', '4'],
            ['category 3', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: 'category 1', y: 2 },
                { x: 'category 2', y: 4 },
                { x: 'category 3', y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.category,
            domain: ['category 1', 'category 2', 'category 3'],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [2, 8],
          },
        },
      },
      {
        title: 'one category serie by guessing',
        input: {
          headList: ['xLabel', 'serie1 (kilo)'],
          delimiter: ['------', '------'],
          rowList: [
            ['category one', '2'],
            ['category two', '4'],
            ['category three', '8'],
          ],
        },
        expectedOutput: {
          serieList: [
            {
              name: 'serie1',
              unit: 'kilo',
              pointList: [
                { x: 'category one', y: 2 },
                { x: 'category two', y: 4 },
                { x: 'category three', y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.category,
            domain: ['category one', 'category two', 'category three'],
          },
          yAxis: {
            label: 'kilo',
            dataType: DataType.number,
            domain: [2, 8],
          },
        },
      },
    ];

    test.each(cases)('return expected value for $title', ({ input, expectedOutput }) => {
      const output = buildGraphData(input);

      expect(output).toEqual(expectedOutput);
    });
  });
});
