import { createSelector } from '@ngrx/store';

import { IWorkflowsNgRxState } from './workflows.reducer';

export const selectWorkflowNgRxState = (state) => state.workflow;

export const selectWorkflowStates = createSelector(
  selectWorkflowNgRxState,
  (state: IWorkflowsNgRxState) => state.stats ? state.stats.states : null
);

export const selectWorkflowStatuses = createSelector(
  selectWorkflowNgRxState,
  (state: IWorkflowsNgRxState) => state.stats ? state.stats.statuses : null
);

export const selectWorkflowTableData = createSelector(
  selectWorkflowNgRxState,
  (state: IWorkflowsNgRxState) => state.workflowTableData
);

export const selectPagination = createSelector(
  selectWorkflowNgRxState,
  (state: IWorkflowsNgRxState) => state.pagination
);
