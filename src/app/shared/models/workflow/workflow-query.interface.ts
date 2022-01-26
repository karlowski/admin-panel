import { IWorkflowTableRow } from './workflows-table.interface';

export interface IWorkflowQuery {
  number: number;
  totalPages: number;
  size: number;
  sort: string;
  totalElements: number;
  content: IWorkflowTableRow[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
}
