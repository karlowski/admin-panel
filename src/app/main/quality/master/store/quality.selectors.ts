import { createSelector } from '@ngrx/store';

import { IQualityNgRxState } from './quality.reducer';

export const selectQualityNgRxState = (state) => state.quality;


export const selectQualityTableData = createSelector(
  selectQualityNgRxState,
  (state: IQualityNgRxState) => state.qualityTableData
);
