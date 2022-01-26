export interface IWorkflowTableRow {
  workflowId: string;
  workflowName: string;
  dummy: IWorkflowsTableDummy;
  childWorkflows: number;
  state: IWorkflowsTableState;
  createdBy: IWorkflowsTableCreatedBy;
  createdAt: number;
  lastUpdated: number;
  status: IWorkflowsStatus;
}

export interface IWorkflowsTableDummy {
  name: string;
  code: string;
}

export interface IWorkflowsTableState {
  id: string;
  name: string;
}

export interface IWorkflowsTableCreatedBy {
  userId: string;
}

export interface IWorkflowsStatus {
  id: string;
  name: string;
}
