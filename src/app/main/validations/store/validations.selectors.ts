import { createSelector } from '@ngrx/store';

import { IValidationsNgRxState } from './validations.reducer';

export const selectValidationNgRxState = (state) => state.validation;

export const selectValidationFlags = createSelector(
  selectValidationNgRxState,
  (state: IValidationsNgRxState) => state.stats?.flagTypes
);

export const selectValidationDates = createSelector(
  selectValidationNgRxState,
  (state: IValidationsNgRxState) => state.stats?.dateIntervals
);

export const selectValidationTableData = createSelector(
  selectValidationNgRxState,
  (state: IValidationsNgRxState) => state.validationTableData
);

export const selectFilters = createSelector(
  selectValidationNgRxState,
  (state: IValidationsNgRxState) => state.filters
);

export const selectPagination = createSelector(
  selectValidationNgRxState,
  (state: IValidationsNgRxState) => state.pagination
);
