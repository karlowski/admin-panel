import { ITravelling } from './travelling-table.interface';

export interface ITravellingQueryResult {
  number: number;
  totalPages: number;
  size: number;
  sort: string;
  totalElements: number;
  content: ITravelling[];
}
