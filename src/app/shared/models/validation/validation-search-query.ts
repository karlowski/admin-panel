export interface IValidationSearchQuery{
  workflowId?: string;
  workflowName?: string;
  status?: string;
  dummy?: string;
  state?: string;
  createdBy?: string | number;
  createdAt?: string | number;
}
