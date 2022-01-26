import { createAction, props } from '@ngrx/store';

import { IWorkflowStats } from '../../../../shared/models/workflow/workflow-stats.interface';
import { IWorkflowTableRow } from '../../../../shared/models/workflow/workflows-table.interface';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { ISearchQuery } from '../../../../shared/models/search-query.interface';

export const loadWorkflow = createAction('[Workflows] Load Workflow', props<{ id: string }>());
export const loadWorkflowSuccess = createAction('[Workflows] Load Workflow Success',
  props<{ workflow: IWorkflowTableRow }>());
export const loadWorkflowFailure = createAction('[Workflows] Load Workflow Failure');

export const loadWorkflowChildStats = createAction('[Workflows] Load Workflow Child Stats');
export const loadWorkflowChildStatsSuccess = createAction('[Workflows] Load Workflow Child Stats Success',
  props<{ stats: IWorkflowStats }>());
export const loadWorkflowChildStatsFailure = createAction('[Workflows] Load Workflow Child Stats Failure');

export const loadWorkflowChildQuery = createAction('[Workflows] Load Workflow Child Query',
  props<{ id: string, pagination?: IPagination, searchQuery?: ISearchQuery }>());
export const loadWorkflowChildQuerySuccess = createAction('[Workflows] Load Workflow Child Query Success',
  props<{ pagination: IPagination, workflowTableData: IWorkflowTableRow[] }>());
export const loadWorkflowChildQueryFailure = createAction('[Workflows] Load Workflow Child Query Failure');

export const doWorkflowChildAction = createAction('[Workflows] Do Workflow Child Action',
  props<{ id: string, action: string }>());
export const doWorkflowChildActionSuccess = createAction('[Workflows] Do Workflow Child Action Success',
  props<IWorkflowTableRow>());
export const doWorkflowChildActionFailure = createAction('[Workflows] Do Workflow Child Action Failure');
