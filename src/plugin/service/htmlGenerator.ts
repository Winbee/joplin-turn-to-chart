import { JSDOM } from 'jsdom';
import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal, scaleTime, scaleBand } from 'd3-scale';
import { line } from 'd3-shape';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { DataType, GraphData } from '../model/GraphData';
import { ConfigKind } from '../model/ConfigData';

export const generateHtml = (graphData: GraphData): string => {
  const margin = { top: 10, right: 30, bottom: 40, left: 55 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const rootFragment = JSDOM.fragment(`<div></div>`);
  const rootDiv = select(rootFragment.firstChild);
  rootDiv
    .style('display', 'flex')
    .style('flex-direction', 'column')
    .style('align-items', 'flex-start');
  const svg = rootDiv
    .append('svg')
    .attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
    )
    .style('width', '100%')
    .style('max-width', '50em')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  let x;
  switch (graphData.xAxis.dataType) {
    case DataType.number: {
      x = scaleLinear();
      break;
    }
    case DataType.date: {
      x = scaleTime();
      break;
    }
    case DataType.category: {
      x = scaleBand();
      break;
    }
    default: {
      throw new Error('Unknown DataType');
    }
  }
  x = x.domain(graphData.xAxis.domain).range([0, width]);
  const y = scaleLinear().domain(graphData.yAxis.domain).range([height, 0]);

  // Add X axis
  let axisBottomCallback = axisBottom(x);
  const xAxisNbOfTicks = graphData.configMap.get(ConfigKind.xAxisNbOfTicks);
  if (xAxisNbOfTicks) {
    axisBottomCallback = axisBottomCallback.ticks(xAxisNbOfTicks);
  }
  const xAxisFormat = graphData.configMap.get(ConfigKind.xAxisFormat);
  if (xAxisFormat) {
    if (graphData.xAxis.dataType === DataType.date) {
      axisBottomCallback = axisBottomCallback.tickFormat(timeFormat(xAxisFormat));
    } else {
      axisBottomCallback = axisBottomCallback.tickFormat(format(xAxisFormat));
    }
  }
  svg.append('g').attr('transform', `translate(0, ${height})`).call(axisBottomCallback);
  svg
    .append('text')
    .attr('fill', 'currentColor')
    .attr('transform', 'translate(' + width / 2 + ' ,' + (height + margin.bottom - 4) + ')')
    .style('text-anchor', 'middle')
    .text(graphData.xAxis.label);

  // Add Y axis
  let axisLeftCallback = axisLeft(y);
  const yAxisNbOfTicks = graphData.configMap.get(ConfigKind.yAxisNbOfTicks);
  if (yAxisNbOfTicks) {
    axisLeftCallback = axisLeftCallback.ticks(yAxisNbOfTicks);
  }
  const yAxisFormat = graphData.configMap.get(ConfigKind.yAxisFormat);
  if (yAxisFormat) {
    axisLeftCallback = axisLeftCallback.tickFormat(format(yAxisFormat));
  }
  svg.append('g').call(axisLeftCallback);
  svg
    .append('text')
    .attr('fill', 'currentColor')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(graphData.yAxis.label);

  const serieListNames = graphData.serieList.map((item) => item.name);
  const color = scaleOrdinal().domain(serieListNames).range(schemeTableau10);
  if (graphData.xAxis.dataType === DataType.category) {
    // Add the bars
    const xSubgroup = scaleBand()
      .domain(serieListNames)
      .range([0, x.bandwidth()])
      .round(true)
      .paddingInner([0])
      .paddingOuter([0.1]);

    graphData.serieList.forEach((item) => {
      item.pointList.forEach((point) => {
        svg
          .append('rect')
          .datum(point)
          .attr('fill', color(item.name))
          .attr('x', (d) => x(d.x) + xSubgroup(item.name))
          .attr('y', (d) => y(d.y))
          .attr('width', xSubgroup.bandwidth())
          .attr('height', (d) => height - y(d.y));
      });
    });
  } else {
    // Add the lines
    graphData.serieList.forEach((item) => {
      svg
        .append('path')
        .datum(item.pointList)
        .attr('fill', 'none')
        .attr('stroke', color(item.name))
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          line()
            .x((d) => x(d.x))
            .y((d) => y(d.y)),
        );

      item.pointList.forEach((onePoint) => {
        svg
          .append('circle')
          .datum(onePoint)
          .attr('fill', color(item.name))
          .attr('r', 2)
          .attr('cx', x(onePoint.x))
          .attr('cy', y(onePoint.y));
      });
    });
  }

  // Add the legend
  const rootLegend = rootDiv
    .append('xhtml:div')
    .style('display', 'flex')
    .style('flex-direction', 'column')
    .style('gap', '0.2em')
    .style('margin', '1em')
    .style('padding', '0.6em')
    .style('border-radius', '5px')
    .style('background', '#0000000d');
  rootLegend
    .append('xhtml:div')
    .style('font-weight', 'bold')
    .style('margin-bottom', '0.3em')
    .text('Legend');
  graphData.serieList.forEach((item) => {
    const oneLegendItem = rootLegend
      .append('xhtml:div')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '0.5em');
    oneLegendItem
      .append('xhtml:div')
      .style('width', '1em')
      .style('height', '1em')
      .style('border-radius', '50%')
      .style('background-color', color(item.name));
    oneLegendItem
      .append('xhtml:div')
      .text(item.unit == null ? item.name : `${item.name} (${item.unit})`);
  });

  return rootFragment.firstChild.outerHTML;
};
