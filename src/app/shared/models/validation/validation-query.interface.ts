import { IValidationTableRow } from './validation-table.interface';

export interface IValidationQuery {
  number: number;
  totalPages: number;
  size: number;
  sort: string;
  totalElements: number;
  content: IValidationTableRow[];
}
