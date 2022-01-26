import { createSelector } from '@ngrx/store';

import { IQualityChildNgRxState } from './quality-child.reducer';

export const selectQualityChildNgRxState = (state) => state.qualityChild;

export const selectChart = createSelector(
  selectQualityChildNgRxState,
  (state: IQualityChildNgRxState) => state.chart
);

export const selectBreakdown = createSelector(
  selectQualityChildNgRxState,
  (state: IQualityChildNgRxState) => state.workflows
);

export const selectQuality = createSelector(
  selectQualityChildNgRxState,
  (state: IQualityChildNgRxState) => state.quality
);

export const selectQualityPagination = createSelector(
  selectQualityChildNgRxState,
  (state: IQualityChildNgRxState) => state.pagination
);