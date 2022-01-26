import { createSelector } from '@ngrx/store';

import { IStartNgRxState } from './start.reducer';

export const selectStartNgRxState = (state) => state.start;

export const selectExtractions = createSelector(
  selectStartNgRxState,
  (state: IStartNgRxState) => state.extractions
);

export const selectStartLoading = createSelector(
  selectStartNgRxState,
  (state: IStartNgRxState) => state.loading
);
