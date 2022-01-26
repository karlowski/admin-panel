import { Action, createReducer, on } from '@ngrx/store';

import * as childWorkflowActions from './workflows-child.actions';
import { IWorkflowStats } from '../../../../shared/models/workflow/workflow-stats.interface';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { IWorkflowTableRow } from '../../../../shared/models/workflow/workflows-table.interface';

export interface IWorkflowsChildNgRxState {
  stats: IWorkflowStats;
  pagination: IPagination;
  workflowTableData: IWorkflowTableRow[];
  workflow: IWorkflowTableRow;
}

export const initialState: IWorkflowsChildNgRxState = {
  stats: null,
  pagination: null,
  workflowTableData: null,
  workflow: null,
};

export function workflowsChildReducer(state: IWorkflowsChildNgRxState | undefined, action: Action): IWorkflowsChildNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IWorkflowsChildNgRxState>(
  initialState,

  on(childWorkflowActions.loadWorkflow, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.loadWorkflowSuccess, (state, { workflow }) => ({
    ...state,
    workflow
  })),

  on(childWorkflowActions.loadWorkflowFailure, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.loadWorkflowChildStats, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.loadWorkflowChildStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
  })),

  on(childWorkflowActions.loadWorkflowChildStatsFailure, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.loadWorkflowChildQuery, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.loadWorkflowChildQuerySuccess, (state, { pagination, workflowTableData }) => ({
    ...state,
    pagination,
    workflowTableData,
  })),

  on(childWorkflowActions.loadWorkflowChildQueryFailure, (state) => ({
    ...state,
  })),

  on(childWorkflowActions.doWorkflowChildActionSuccess, (state, workflow) => ({
    ...state,
    workflow
  })),
);
