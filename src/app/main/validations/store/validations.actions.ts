import { createAction, props } from '@ngrx/store';

import { IValidationStats } from '../../../shared/models/validation/validation-stats.interface';
import { IValidationTableRow } from '../../../shared/models/validation/validation-table.interface';
import { IValidationSearchQuery } from '../../../shared/models/validation/validation-search-query';
import { IPagination } from 'src/app/shared/models/pagination.interface';

export const loadValidationStats = createAction('[Validations] Load Validation Stats');
export const loadValidationStatsSuccess = createAction('[Validations] Load Validation Stats Success', props<{ stats: IValidationStats }>());
export const loadValidationStatsFailure = createAction('[Validations] Load Validation Stats Failure');


export const loadValidationQuery = createAction('[Validations] Load Validation Query',
  props<{ pagination?: IPagination, searchQuery?: IValidationSearchQuery }>());
export const loadValidationQuerySuccess = createAction('[Validations] Load Validation Query Success',
  props<{ pagination: IPagination, validationTableData: IValidationTableRow[] }>());
export const loadValidationQueryFailure = createAction('[Validations] Load Validation Query Failure');
