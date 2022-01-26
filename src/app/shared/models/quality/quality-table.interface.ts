export interface IQualityTableRow {
  dummyCode: string;
  averageBasic: number;
  averageExtended: number;
  averageFiling: number;
  averageData: number;
  averageMLScore: number;
  averageMLPrecision: number;
}

export interface IQuality {
  basicFields: number;
  extendedFields: number;
  npRelatedParties: number;
  leRelatedParties: number;
  npUbo: number;
  leUbo: number;
  mlScore: number;
  mlPrecision: number;
  registryDataQuality: string;
}
