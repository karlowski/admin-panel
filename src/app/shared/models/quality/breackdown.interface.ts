export interface IQualityQueryResult {
  number: number;
  totalPages: number;
  size: number;
  sort: string;
  totalElements: number;
  content: IBreakdownRow[];
}

export interface IBreakdownRow {
  createdAt: number;
  workflowName: string;
  workflowId: string;
  averageBasic: number;
  averageExtended: number;
  averageFiling: number;
  averageData: number;
  averageMLScore: number;
  averageMLPrecision: number;
}
