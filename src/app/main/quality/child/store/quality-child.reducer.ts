import { Action, createReducer, on } from '@ngrx/store';

import * as childQualityActions from './quality-child.actions';
import { IChartData } from '../../../../shared/models/quality/chart-data.interface';
import { IBreakdownRow } from '../../../../shared/models/quality/breackdown.interface';
import { IQualityTableRow } from 'src/app/shared/models/quality/quality-table.interface';
import { IPagination } from 'src/app/shared/models/pagination.interface';


export interface IQualityChildNgRxState {
  chart: IChartData[];
  workflows: IBreakdownRow[];
  pagination: IPagination;
  quality: IQualityTableRow;
}

export const initialState: IQualityChildNgRxState = {
  chart: null,
  workflows: null,
  quality: null,
  pagination: null
};

export function qualityChildReducer(state: IQualityChildNgRxState | undefined, action: Action): IQualityChildNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IQualityChildNgRxState>(
  initialState,

  on(childQualityActions.loadQualityChild, (state) => ({
    ...state,
  })),

  on(childQualityActions.loadQualityChildSuccess, (state, { chart, pagination, workflows }) => ({
    ...state,
    chart,
    workflows,
    pagination,
  })),

  on(childQualityActions.loadQualityChildFailure, (state) => ({
    ...state,
  })),
);
