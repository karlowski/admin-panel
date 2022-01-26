import { IPaymentSourceRow } from '../travelling/travelling-table.interface';

export interface IPaymentSourceQuery {
  number: number;
  totalPages: number;
  size: number;
  sort: string;
  totalElements: number;
  content: IPaymentSourceRow[];
}
