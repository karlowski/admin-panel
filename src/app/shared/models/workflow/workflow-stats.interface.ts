import { IStat } from '../stat.interface';

export interface IWorkflowStats {
  statuses: IStat[];
  states: IStat[];
}
