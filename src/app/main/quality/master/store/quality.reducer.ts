import { Action, createReducer, on } from '@ngrx/store';

import * as qualityActions from './quality.actions';
import { IQualityTableRow } from '../../../../shared/models/quality/quality-table.interface';

export interface IQualityNgRxState {
  qualityTableData: IQualityTableRow[];
}

export const initialState: IQualityNgRxState = {
  qualityTableData: null,
};

export function qualityReducer(state: IQualityNgRxState | undefined, action: Action): IQualityNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IQualityNgRxState>(
  initialState,

  on(qualityActions.loadQuality, (state) => ({
    ...state,
  })),

  on(qualityActions.loadQualitySuccess, (state, { quality }) => ({
    ...state,
    quality
  })),

  on(qualityActions.loadQualityFailure, (state) => ({
    ...state,
  })),

  on(qualityActions.loadQualityQuery, (state) => ({
    ...state,
  })),

  on(qualityActions.loadQualityQuerySuccess, (state, { qualityTableData }) => ({
    ...state,
    qualityTableData,
  })),

  on(qualityActions.loadQualityQueryFailure, (state) => ({
    ...state,
  })),
);
