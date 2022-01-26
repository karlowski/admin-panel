import { IWorkflowsTableCreatedBy } from '../workflow/workflows-table.interface';
import { ILabelingHealth } from './labeling/health';
import { ILabelingPayload } from './labeling/payload';
import { ILabelingQuery } from './labeling/query';
import { ILabelingRaw } from './labeling/raw';
import { ILabelingRule } from './labeling/rule';

export interface IValidationLabeling {
  _iBrumaId: string;
  workflowStep: string;
  workflowStatus: string;
  createdAt: string;
  updatedAt: string;
  createdBy: IWorkflowsTableCreatedBy;
  query: ILabelingQuery;
  rules: ILabelingRule[];
  health: ILabelingHealth[];
  raw: ILabelingRaw;
  payload: ILabelingPayload;
}
