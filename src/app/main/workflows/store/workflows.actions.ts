import { createAction, props } from '@ngrx/store';

import { IWorkflowStats } from '../../../shared/models/workflow/workflow-stats.interface';
import { IWorkflowTableRow } from '../../../shared/models/workflow/workflows-table.interface';
import { IPagination } from '../../../shared/models/pagination.interface';
import { ISearchQuery } from '../../../shared/models/search-query.interface';

export const loadWorkflowStats = createAction('[Workflows] Load Workflow Stats');
export const loadWorkflowStatsSuccess = createAction('[Workflows] Load Workflow Stats Success', props<{ stats: IWorkflowStats }>());
export const loadWorkflowStatsFailure = createAction('[Workflows] Load Workflow Stats Failure');


export const loadWorkflowQuery = createAction('[Workflows] Load Workflow Query',
  props<{ pagination?: IPagination, searchQuery?: ISearchQuery }>());
export const loadWorkflowQuerySuccess = createAction('[Workflows] Load Workflow Query Success',
  props<{ pagination: IPagination, workflowTableData: IWorkflowTableRow[] }>());
export const loadWorkflowQueryFailure = createAction('[Workflows] Load Workflow Query Failure');

