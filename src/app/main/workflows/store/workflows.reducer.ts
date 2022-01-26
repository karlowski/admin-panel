import { Action, createReducer, on } from '@ngrx/store';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { IWorkflowStats } from 'src/app/shared/models/workflow/workflow-stats.interface';
import { IWorkflowTableRow } from 'src/app/shared/models/workflow/workflows-table.interface';

import * as workflowActions from './workflows.actions';

export interface IWorkflowsNgRxState {
  stats: IWorkflowStats;
  pagination: IPagination;
  workflowTableData: IWorkflowTableRow[];
}

export const initialState: IWorkflowsNgRxState = {
  stats: null,
  pagination: null,
  workflowTableData: null,
};

export function workflowsReducer(state: IWorkflowsNgRxState | undefined, action: Action): IWorkflowsNgRxState {
  return reducer(state, action);
}

const reducer = createReducer<IWorkflowsNgRxState>(
  initialState,

  on(workflowActions.loadWorkflowStats, (state) => ({
    ...state,
  })),

  on(workflowActions.loadWorkflowStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
  })),

  on(workflowActions.loadWorkflowStatsFailure, (state) => ({
    ...state,
  })),

  on(workflowActions.loadWorkflowQuery, (state) => ({
    ...state,
    searchQuery: null
  })),

  on(workflowActions.loadWorkflowQuerySuccess, (state, { pagination, workflowTableData }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      page: pagination.page,
      size: pagination.size,
      totalPages: pagination.totalPages,
      totalElements: pagination.totalElements
    },
    workflowTableData,
  })),

  on(workflowActions.loadWorkflowQueryFailure, (state) => ({
    ...state,
  })),
);
