import { createSelector } from '@ngrx/store';

import { IWorkflowsChildNgRxState } from './workflows-child.reducer';

export const selectWorkflowChildNgRxState = (state) => state.workflowChild;

export const selectWorkflow = createSelector(
  selectWorkflowChildNgRxState,
  (state: IWorkflowsChildNgRxState) => state.workflow
);

export const selectWorkflowChildTableData = createSelector(
  selectWorkflowChildNgRxState,
  (state: IWorkflowsChildNgRxState) => state.workflowTableData
);

export const selectChildPagination = createSelector(
  selectWorkflowChildNgRxState,
  (state: IWorkflowsChildNgRxState) => state.pagination
);


export const selectChildWorkflowStates = createSelector(
  selectWorkflowChildNgRxState,
  (state: IWorkflowsChildNgRxState) => state.stats ? state.stats.states : null
);

export const selectChildWorkflowStatuses = createSelector(
  selectWorkflowChildNgRxState,
  (state: IWorkflowsChildNgRxState) => state.stats ? state.stats.statuses : null
);
