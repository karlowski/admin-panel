import { IStat } from '../stat.interface';

export interface IValidationStats {
  flagTypes: IStat[];
  dateIntervals: IStat[];
  clientTypes: IStat[];
}
