import { createAction, props } from '@ngrx/store';

import { IPagination } from '../../../shared/models/pagination.interface';
import { IPaymentSourceRow } from '../../../shared/models/travelling/travelling-table.interface';
import { ITravellingStats } from 'src/app/shared/models/travelling/travelling-stats.interface';
import { IPaymentSourceSearchQuery } from 'src/app/shared/models/payment-source/payment-source-search-query.interface';

export const loadDummyQuery = createAction('[Travelling] Load Dummy Query',
  props<{ pagination?: IPagination, searchQuery?: IPaymentSourceSearchQuery }>());
export const loadDummyQuerySuccess = createAction('[Travelling] Load Dummy Query Success',
  props<{ pagination: IPagination, paymentSourceTableData: IPaymentSourceRow[] }>());
export const loadDummyQueryFailure = createAction('[Travelling] Load Dummy Query Failure');

export const loadDateStats = createAction('[Travelling] Load Travelling Stats');
export const loadDateStatsSuccess = createAction('[Travelling] Load Travelling Stats Success', props<{ stats: ITravellingStats }>());
export const loadDateStatsFailure = createAction('[Travelling] Load Travelling Stats Failure');
