import { createAction, props } from '@ngrx/store';

import { IQualityTableRow } from '../../../../shared/models/quality/quality-table.interface';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';


export const loadQuality = createAction('[Quality] Load Quality', props<{ id: string }>());
export const loadQualitySuccess = createAction('[Quality] Load Quality Success',
  props<{ quality }>());
export const loadQualityFailure = createAction('[Quality] Load Quality Failure');


export const loadQualityQuery = createAction('[Quality] Load Quality Query',
  props<{ searchQuery?: ISearchQuery }>());
export const loadQualityQuerySuccess = createAction('[Quality] Load Quality Query Success',
  props<{ qualityTableData: IQualityTableRow[] }>());
export const loadQualityQueryFailure = createAction('[Quality] Load Quality Query Failure');


