import { IDummy } from '../dummy';

export interface IValidationTableRow {
  workflowId: string;
  workflowName: string;
  dummy: IDummy;
  childWorkflows: number;
  state: IValidationsTableState;
}
export interface IValidationsTableState {
  id: string;
  value: string;
}
