import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as d3 from 'd3';

import { IChartData } from '../../models/quality/chart-data.interface';
import { selectChart } from 'src/app/main/quality/child/store/quality-child.selectors';
import { Store } from '@ngrx/store';
import { IQualityChildNgRxState } from 'src/app/main/quality/child/store/quality-child.reducer';
import { getMonthDayString } from '../../models/util/text.util';

@Component({
  selector: 'app-inline-labels-chart',
  templateUrl: './inline-labels-chart.component.html',
  styleUrls: ['./inline-labels-chart.component.scss']
})
export class InlineLabelsChartComponent {
  private columns = ['basicFields', 'extendedFields', 'filings', 'data', 'mlScore', 'mlPrecision' ];
  private svg;
  private margin = ({top: 30, right: 50, bottom: 30, left: 30});
  private width = 1340;
  private height = 500;
  private labelPadding = 6;
  private datePipe: DatePipe;
  private linesColors = ['#FD9937', '#00ADC8', '#727680', '#B3D564', 'darkblue', 'lightgrey'];

  constructor( private store: Store<IQualityChildNgRxState> ) {
    this.datePipe = new DatePipe('en-US');
    this.store.select(selectChart).subscribe(chartData =>  this.drawChart(chartData));
  }

  private createSvg(): void {
    if (this.svg) {
      this.svg.remove();
    }
    this.svg = d3.select('figure#chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', '-10 0 ' + this.width + ' ' + this.height)
      .attr('font-family', 'Montserrat')
      .attr('color', '#65666A');
  }

  private drawChart(chartData: IChartData[]): void {
    if (!chartData) {
      return;
    }
    this.createSvg();
    const data = chartData.map(el => ({
      ...el,
      date: this.getDateFrom(el.daysSince)
    }));
    // @ts-ignore
    const series = this.columns.map(key => data.map(({[key]: value, date}) => ({key, date, value})));
    const x = d3.scaleUtc()
      .domain([data[0].date, data[data.length - 1].date])
      .range([this.margin.left, this.width - this.margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
      .range([this.height - this.margin.bottom, this.margin.top]);

    const z = d3.scaleOrdinal(this.columns, this.linesColors);

    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6, d3.timeDay).tickFormat(getMonthDayString))
      .attr('transform', `translate(0,${this.height - this.margin.bottom + 6})`)
      // tslint:disable-next-line:no-shadowed-variable
      .call(g => g.select('.domain').remove())
      // tslint:disable-next-line:no-shadowed-variable
      .call(g => g.selectAll('.tick line').clone()
        .attr('stroke-opacity', 0.2)
        .attr('y1', -this.height));

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left - 6},0)`)
      .call(d3.axisLeft(y.copy()).ticks(5))
      // tslint:disable-next-line:no-shadowed-variable
      .call(g => g.select('.domain').remove())
      // tslint:disable-next-line:no-shadowed-variable
      .call(g => g.selectAll('.tick line').clone()
        .attr('stroke-opacity', 0.2)
        .attr('x1', this.width))
      // tslint:disable-next-line:no-shadowed-variable
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold'));

    this.svg.append('g')
      .call(xAxis)
      .attr('font-size', 12);

    this.svg.append('g')
      .call(yAxis)
      .attr('font-size', 12);

    const serie = this.svg.append('g')
      .selectAll('g')
      .data(series)
      .join('g');

    serie.append('path')
      .attr('fill', 'none')
      .attr('stroke', d => z(d[0].key))
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        // @ts-ignore
        .x(d => x(d.date))
        // @ts-ignore
        .y(d => y(d.value)));

    serie.append('g')
      .attr('font-size', 12)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(d => d)
      .join('dots')
      .text(d => d.value)
      .attr('dy', '0.35em')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.value))
      .call(text => text.filter((d, i, data) => i === data.length - 1)
        .append('tspan')
        .attr('font-weight', 'bold')
        .text(d => ` ${d.key}`))
      .clone(true).lower()
      .attr('r', 10)
      .attr('stroke-width', this.labelPadding);

    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    serie.append('g')
      .selectAll('circle')
      .data(d => d)
      .enter()
      .append('circle')
      .attr('dy', '0.35em')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('data-tag', d => 'date: ' + this.datePipe.transform(d.date, 'dd/MM/yyyy') + '<br/>value: ' + d.value)
      .on('mouseover', d => {
        div.transition(d)
          .duration(200)
          .style('display', 'block')
          .style('opacity', .9);
        div.html(d.target.getAttribute('data-tag'))
          .style('left', d.pageX + 'px')
          .style('top', d.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        div.transition()
          .duration(500)
          .style('opacity', 0);
       })
      .attr('r', 8)
      .attr('fill', 'white')
      .attr('stroke', 'gray');
  }

  getDateFrom(daysSince: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - daysSince);
    return date;
  }
}
