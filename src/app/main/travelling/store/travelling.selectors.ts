import { createSelector } from '@ngrx/store';
import { ITravellingNgRxState } from './travelling.reducer';

export const selectTravellingNgRxState = (state) => state.travelling;

export const selectQuery = createSelector(
  selectTravellingNgRxState,
  (state: ITravellingNgRxState) => state.paymentSourceTableData
);

export const selectTravellingDates = createSelector(
  selectTravellingNgRxState,
  (state: ITravellingNgRxState) => state.stats
);
export const selectPagination = createSelector(
  selectTravellingNgRxState,
  (state: ITravellingNgRxState) => state.pagination
);
