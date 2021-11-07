import { DataType, GraphData } from '../model/GraphData';
import { generateHtml } from './htmlGenerator';
import * as fs from 'fs';
import { minify } from 'html-minifier';

const minifyConf = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
};

describe('htmlGenerator', () => {
  describe('generateHtml', () => {
    const cases: { title: string; input: GraphData }[] = [
      {
        title: 'one line of numbers by number',
        input: {
          serieList: [
            {
              name: 'serie1',
              unit: 'unit1',
              pointList: [
                { x: 0, y: 2 },
                { x: 1, y: 4 },
                { x: 2, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.number,
            domain: [0, 2],
          },
          yAxis: {
            label: 'unit1',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'two lines of numbers by number',
        input: {
          serieList: [
            {
              name: 'serie1',
              unit: 'unit1',
              pointList: [
                { x: 0, y: 2 },
                { x: 1, y: 4 },
                { x: 2, y: 8 },
              ],
            },
            {
              name: 'serie2',
              unit: 'unit2',
              pointList: [
                { x: 0, y: 4 },
                { x: 1, y: 5 },
                { x: 2, y: 1 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.number,
            domain: [0, 2],
          },
          yAxis: {
            label: 'unit1, unit2',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one line of numbers by date',
        input: {
          serieList: [
            {
              name: 'serie1',
              unit: 'unit1',
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
            label: 'unit1',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'one line of numbers by category',
        input: {
          serieList: [
            {
              name: 'serie1',
              unit: 'unit1',
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
            label: 'unit1',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
      {
        title: 'three lines of numbers by category',
        input: {
          serieList: [
            {
              name: 'serie1',
              unit: 'unit1',
              pointList: [
                { x: 'category 1', y: 2 },
                { x: 'category 2', y: 4 },
                { x: 'category 3', y: 8 },
              ],
            },
            {
              name: 'serie2',
              unit: 'unit2',
              pointList: [
                { x: 'category 1', y: 4 },
                { x: 'category 2', y: 5 },
                { x: 'category 3', y: 2 },
              ],
            },
            {
              name: 'serie3',
              unit: 'unit3',
              pointList: [
                { x: 'category 1', y: 1 },
                { x: 'category 2', y: 2 },
                { x: 'category 3', y: 3 },
              ],
            },
          ],
          xAxis: {
            label: 'xLabel',
            dataType: DataType.category,
            domain: ['category 1', 'category 2', 'category 3'],
          },
          yAxis: {
            label: 'unit1',
            dataType: DataType.number,
            domain: [0, 8],
          },
        },
      },
    ];

    test.each(cases)('return expected value for $title', ({ title, input }) => {
      const output = generateHtml(input);
      const minifiedOutput = minify(output, minifyConf);

      const fileName = title.split(' ').join('_');
      const filePath = `${__dirname}/testAsset/${fileName}.html`;
      if (!fs.existsSync(filePath)) {
        // When the file doesn't exist, we create them like snapshot test.
        fs.writeFileSync(filePath, minifiedOutput);
      }
      const expectedOutput = minify(fs.readFileSync(filePath).toString(), minifyConf);
      expect(minifiedOutput).toEqual(expectedOutput);
    });
  });
});