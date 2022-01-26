import { createAction, props } from '@ngrx/store';
import { ICompany } from '../company.interface';

export const loadCompanyList = createAction('[Start] Load Country', props<{ searchTerm: string }>());
export const loadCompanyListSuccess = createAction('[Start] Load Country List Success', props<{ extractions: ICompany[] }>());
export const loadCompanyListFailure = createAction('[Start] Load Country List Failure');

export const submitCompany = createAction('[Start] Submit Country', props<{ startData: ICompany }>());
export const submitCompanySuccess = createAction('[Start] Submit Country List Success', props<{workflowId: string}>());
export const submitCompanyFailure = createAction('[Start] Submit Country List Failure');
