import { createSelector } from '@ngrx/store';

import { ITravellingChildNgRxState } from './travelling-child.reducer';

export const selectTravellingChildNgRx = (state) => state.travellingChild;

export const selectTravelling = createSelector(
  selectTravellingChildNgRx,
  (state: ITravellingChildNgRxState) => state.travellings
);


export const selectPaymentSource = createSelector(
  selectTravellingChildNgRx,
  (state: ITravellingChildNgRxState) => state.dummyPaymentSources
);

export const selectTravellingPagination = createSelector(
  selectTravellingChildNgRx,
  (state: ITravellingChildNgRxState) => state.pagination
);


export const selectTravellingsUpdated = createSelector(
  selectTravellingChildNgRx,
  (state: ITravellingChildNgRxState) => state.travellingsUpdated
);

export const selectPaymentSourcesUpdated = createSelector(
  selectTravellingChildNgRx,
  (state: ITravellingChildNgRxState) => state.paymentSourcesUpdated
);


