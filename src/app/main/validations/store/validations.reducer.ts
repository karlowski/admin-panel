import { Action, createReducer, on } from '@ngrx/store';

import * as validationActions from './validations.actions';
import { IValidationStats } from '../../../shared/models/validation/validation-stats.interface';
import { IPagination } from '../../../shared/models/pagination.interface';
import { IValidationTableRow } from '../../../shared/models/validation/validation-table.interface';
import { IValidationFilter } from '../../../shared/models/validation/validation-filter.interface';

export interface IValidationsNgRxState {
  stats: IValidationStats;
  pagination: IPagination;
  validationTableData: IValidationTableRow[];
  filters: IValidationFilter;
}

export const initialState: IValidationsNgRxState = {
  stats: null,
  pagination: null,
  validationTableData: null,
  filters: null,
};

export function validationsReducer(state: IValidationsNgRxState | undefined, action: Action): IValidationsNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IValidationsNgRxState>(
  initialState,

  on(validationActions.loadValidationStats, (state) => ({
    ...state,
  })),

  on(validationActions.loadValidationStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
  })),

  on(validationActions.loadValidationStatsFailure, (state) => ({
    ...state,
  })),

  on(validationActions.loadValidationQuery, (state) => ({
    ...state,
  })),

  on(validationActions.loadValidationQuerySuccess, (state, { pagination, validationTableData }) =>  ({
    ...state,
    pagination: {
      ...state.pagination,
      page: pagination.page,
      size: pagination.size,
      totalPages: pagination.totalPages,
      totalElements: pagination.totalElements
    },
    validationTableData,
  })),

  on(validationActions.loadValidationQueryFailure, (state) => ({
    ...state,
  })),
);
