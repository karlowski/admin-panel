import { createSelector } from '@ngrx/store';
import { IValidationsNgRxState } from '../../store/validations.reducer';
import { IValidationsChildNgRxState } from './validations-child.reducer';

export const selectValidationChildNgRxState = (state) => state.validationChild;

export const selectValidation = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsChildNgRxState) => state.validationLabeling
);

export const selectChildFilters = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsNgRxState) => state.filters
);

export const selectChildPagination = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsNgRxState) => state.pagination
);


export const selectChildValidationDates = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsNgRxState) => state.stats?.dateIntervals
);

export const selectChildValidationFlags = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsNgRxState) => state.stats?.flagTypes
);


export const selectChildValidationClientTypes = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsNgRxState) => state.stats?.clientTypes
);

export const selectSaveField = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsChildNgRxState) => state.newField
);

export const selectLastChildUpdated = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsChildNgRxState) => state.isLastChildUpdated
);

export const selectDocumentUrls = createSelector(
  selectValidationChildNgRxState,
  (state: IValidationsChildNgRxState) => state.documents,
);
