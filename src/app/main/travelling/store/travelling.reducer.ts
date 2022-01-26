import { Action, createReducer, on } from '@ngrx/store';


import * as travellingActions from './travelling.actions';
import { IPagination } from '../../../shared/models/pagination.interface';
import { IPaymentSourceRow } from '../../../shared/models/travelling/travelling-table.interface';
import { ITravellingStats } from 'src/app/shared/models/travelling/travelling-stats.interface';

export interface ITravellingNgRxState {
  pagination: IPagination;
  paymentSourceTableData: IPaymentSourceRow[];
  stats: ITravellingStats;
}

export const initialState: ITravellingNgRxState = {
  pagination: null,
  paymentSourceTableData: null,
  stats: null,
};

export function travellingReducer(state: ITravellingNgRxState | undefined, action: Action): ITravellingNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<ITravellingNgRxState>(
  initialState,

  on(travellingActions.loadDummyQuery, (state) => ({
    ...state,
  })),

  on(travellingActions.loadDummyQuerySuccess, (state, { pagination, paymentSourceTableData }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      page: pagination.page,
      size: pagination.size,
      totalPages: pagination.totalPages,
      totalElements: pagination.totalElements
    },
    paymentSourceTableData,
  })),

  on(travellingActions.loadDummyQueryFailure, (state) => ({
    ...state,
  })),

  on(travellingActions.loadDateStats, (state) => ({
    ...state,
  })),

  on(travellingActions.loadDateStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
  })),

  on(travellingActions.loadDateStatsFailure, (state) => ({
    ...state,
  })),
);
