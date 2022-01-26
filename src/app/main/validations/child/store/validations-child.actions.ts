import { createAction, props } from '@ngrx/store';
import { IPatchOperation } from 'src/app/shared/models/validation/patch-operation.interface';
import { IValidationLabeling } from 'src/app/shared/models/validation/validation-labeling.interface';

import { IValidationStats } from '../../../../shared/models/validation/validation-stats.interface';

export const loadValidation = createAction('[Validations] Load Validation', props<{ id: string }>());
export const loadValidationSuccess = createAction('[Validations] Load Validation Success',
  props<{ validationLabeling: IValidationLabeling }>());
export const loadValidationFailure = createAction('[Validations] Load Validation Failure');

export const loadValidationChildStats = createAction('[Validations] Load Validation Child Stats');
export const loadValidationChildStatsSuccess = createAction('[Validations] Load Validation Child Stats Success',
  props<{ stats: IValidationStats }>());
export const loadValidationChildStatsFailure = createAction('[Validations] Load Validation Child Stats Failure');

export const saveField = createAction('[Validations] Save Field', props<{ labelingId: string, patchOperation: IPatchOperation, validationId: string }>());
export const saveFieldSuccess = createAction('[Validations] Save Field Success', props<{ id: string }>());
export const saveFieldFailure = createAction('[Validations] Save Field Failure');

export const updateField = createAction('[Validations] Update Field', props<{ labelingId: string, patchOperation: IPatchOperation }>());
export const updateFieldSuccess = createAction('[Validations] Update Field Success', props<{ patchOperation: IPatchOperation }>());
export const updateFieldFailure = createAction('[Validations] Update Field Failure');

export const doValidationChildAction = createAction('[Validations] Do Validation Child Action',
  props<{ id: string, action: string }>());
export const doValidationChildActionSuccess = createAction('[Validations] Do Validation Child Action Success',
  props<IValidationLabeling>());
export const doValidationChildActionFailure = createAction('[Validations] Do Validation Child Action Failure');

export const purchaseDocument = createAction('[Validations] Purchase Document', props<{ documentId: string }>());
export const documentPurchased = createAction('[Validations] Document Purchased', props<{ item: any }>());
export const documentNotPurchased = createAction('[Validations] Document Not Purchased');
