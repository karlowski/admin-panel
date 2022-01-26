import { createAction, props } from '@ngrx/store';

import { IChartData } from '../../../../shared/models/quality/chart-data.interface';
import { IBreakdownRow } from '../../../../shared/models/quality/breackdown.interface';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';

export const loadQualityChild = createAction('[Quality] Load Quality Child',
  props<{ dummyCode: string, pagination?: IPagination, searchQuery: ISearchQuery }>());
export const loadQualityChildSuccess = createAction('[Quality] Load Quality Child Success',
  props<{chart: IChartData[], pagination: IPagination, workflows: IBreakdownRow[] }>());
export const loadQualityChildFailure = createAction('[Quality] Load Quality Child Failure');
