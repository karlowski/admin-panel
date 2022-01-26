import { IQualityQueryResult } from './breackdown.interface';
import { IChartData } from './chart-data.interface';

export interface IQualityChildData {
  chart: IChartData[];
  workflows: IQualityQueryResult;
}
