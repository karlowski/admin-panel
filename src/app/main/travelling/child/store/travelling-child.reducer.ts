import { Action, createReducer, on } from '@ngrx/store';
import { ITravelling, IDummyPaymentSources } from 'src/app/shared/models/travelling/travelling-table.interface';
import { IPagination } from 'src/app/shared/models/pagination.interface';

import * as childTravellingActions from './travelling-child.actions';

export interface ITravellingChildNgRxState {
  travellings: ITravelling[];
  dummyPaymentSources: IDummyPaymentSources;
  pagination: IPagination;
  travellingsUpdated: boolean;
  paymentSourcesUpdated: boolean;
}

export const initialState: ITravellingChildNgRxState = {
  dummyPaymentSources: null,
  travellings: null,
  pagination: null,
  travellingsUpdated: false,
  paymentSourcesUpdated: false
};

export function travellingChildReducer(state: ITravellingChildNgRxState | undefined, action: Action): ITravellingChildNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<ITravellingChildNgRxState>(
  initialState,

  on(childTravellingActions.loadDummy, (state) => ({
    ...state,
  })),

  on(childTravellingActions.loadDummySuccess, (state, { dummyPaymentSources }) => ({
    ...state,
    dummyPaymentSources
  })),

  on(childTravellingActions.loadDummyFailure, (state) => ({
    ...state,
  })),

  on(childTravellingActions.loadChildTravellingQueryFailure, (state) => ({
    ...state,
  })),

  on(childTravellingActions.loadChildTravellingQuery, (state) => ({
    ...state,
  })),

  on(childTravellingActions.loadChildTravellingQuerySuccess, (state, { pagination, travellings }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      page: pagination.page,
      size: pagination.size,
      totalPages: pagination.totalPages,
      totalElements: pagination.totalElements
    },
    travellings,
  })),

  on(childTravellingActions.updatePaymentSourcesSuccess, (state, {  }) => ({
    ...state,
    paymentSourcesUpdated: !state.paymentSourcesUpdated,
  })),

  on(childTravellingActions.topupSuccess, (state, {  }) => ({
    ...state,
    paymentSourcesUpdated: !state.paymentSourcesUpdated,
    travellingsUpdated: !state.travellingsUpdated,
  })),

);


