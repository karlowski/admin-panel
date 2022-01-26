import { IValidationStatus } from './validation-status.interface';
import { IValidationState } from './validation-state.interface';
import { IClient } from '../client.interface';

export interface IValidationFilter {
  statuses: IValidationStatus[];
  states: IValidationState[];
  customer: IClient[];
  dateIntervals: number[];
}
