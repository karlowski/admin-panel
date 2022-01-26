import { Action, createReducer, on } from '@ngrx/store';

import * as childValidationActions from './validations-child.actions';
import { IValidationStats } from '../../../../shared/models/validation/validation-stats.interface';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { IValidationTableRow } from '../../../../shared/models/validation/validation-table.interface';
import { IValidationFilter } from '../../../../shared/models/validation/validation-filter.interface';
import { IValidationLabeling } from 'src/app/shared/models/validation/validation-labeling.interface';

export interface IValidationsChildNgRxState {
  stats: IValidationStats;
  pagination: IPagination;
  validationTableData: IValidationTableRow[];
  filters: IValidationFilter;
  validationLabeling: IValidationLabeling;
  newField: string;
  isLastChildUpdated: boolean;
  documents: { [documentId: string]: string };
}

export const initialState: IValidationsChildNgRxState = {
  stats: null,
  pagination: null,
  validationTableData: null,
  validationLabeling: null,
  filters: null,
  newField: null,
  isLastChildUpdated: false,
  documents: {},
};

const mockedCatalogItems = [
  {
    documentId: 'testId',
    name: '1',
    value: 'nkgndlfgldfngldskfngds',
    extractedAt: '967456945655',
    type: 'some type',
    currency: 'UAH',
    price: 220,
    url: null,
  },
  {
    documentId: 'testId2',
    name: '2',
    value: 'nkgndlfgldfngldskfngds',
    extractedAt: '967456945655',
    type: 'some type1',
    currency: 'UAH',
    price: 222,
    url: null,
  },
  {
    documentId: 'testId34343',
    name: '3',
    value: 'nkgndlfgldfngldskfngds',
    extractedAt: '967456945655',
    type: 'some type2',
    currency: 'UAH',
    price: 333,
    url: '1231231231',
  },
];

export function validationsChildReducer(state: IValidationsChildNgRxState | undefined, action: Action): IValidationsChildNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IValidationsChildNgRxState>(
  initialState,

  on(childValidationActions.loadValidation, (state) => ({
    ...state,
  })),

  on(childValidationActions.loadValidationSuccess, (state, { validationLabeling }) => {
    const documents = {};
    mockedCatalogItems.forEach(catalogItem => {
      documents[catalogItem.documentId] = catalogItem.url;
    });
    if (state.isLastChildUpdated) {
      validationLabeling.raw.data.relatedParty[validationLabeling.raw.data.relatedParty.length - 1][0].modified = true;
    }
    return {
      ...state,
      documents,
      isLastChildUpdated: false,
      validationLabeling: {
        ...validationLabeling,
        raw: {
          ...validationLabeling.raw,
          data: {
            ...validationLabeling.raw.data,
            relatedParty: validationLabeling.raw.data.relatedParty,
            documentCatalog: mockedCatalogItems,
          }
        }
      }
    };
  }),

  on(childValidationActions.loadValidationFailure, (state) => ({
    ...state,
  })),

  on(childValidationActions.loadValidationChildStats, (state) => ({
    ...state,
  })),

  on(childValidationActions.loadValidationChildStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
  })),

  on(childValidationActions.loadValidationChildStatsFailure, (state) => ({
    ...state,
  })),

  on(childValidationActions.saveFieldSuccess, (state) => ({
    ...state,
    loading: false,
    isLastChildUpdated: true
  })),

  on(childValidationActions.updateFieldSuccess, (state, { patchOperation }) => ({
    ...state,
    newField: patchOperation.value
  })),

  on(childValidationActions.doValidationChildActionSuccess, (state, validationLabeling) => ({
    ...state,
    validationLabeling
  })),

  on(childValidationActions.documentPurchased, (state, { item }) => ({
    ...state,
    documents: {
      ...state.documents,
      [item.documentId]: item.url,
    }
  })),
);
