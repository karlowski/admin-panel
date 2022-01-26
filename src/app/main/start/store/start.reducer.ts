import { Action, createReducer, on } from '@ngrx/store';
import { ICompany } from '../company.interface';

import * as startActions from './start.actions';

export interface IStartNgRxState {
  extractions: ICompany[];
  loading: boolean;
}

export const initialState: IStartNgRxState = {
  extractions: null,
  loading: false
};

export function startReducer(state: IStartNgRxState | undefined, action: Action): IStartNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IStartNgRxState>(
  initialState,

  on(startActions.loadCompanyList, (state) => ({
    ...state,
    loading: true
  })),

  on(startActions.loadCompanyListSuccess, (state, { extractions }) => ({
    ...state,
    extractions,
    loading: false
  })),

  on(startActions.loadCompanyListFailure, (state) => ({
    ...state,
    extractions: null,
    loading: false
  })),
);
