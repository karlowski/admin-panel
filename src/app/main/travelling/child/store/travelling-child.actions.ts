import { createAction, props } from '@ngrx/store';
import { ITravellingSearchQuery } from 'src/app/shared/models/travelling/travelling-search-query.interface';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { ITravelling, IDummyPaymentSources, IPaymentSource, IPaymentSourceAlert, IPaymentSourceLimit, IPaymentSourceTopup } from '../../../../shared/models/travelling/travelling-table.interface';

export const loadDummy = createAction('[Travelling] Load Jurisdiciton', props<{ id: string }>());
export const loadDummySuccess = createAction('[Travelling] Load Dummy Success',
  props<{ dummyPaymentSources: IDummyPaymentSources }>());
export const loadDummyFailure = createAction('[Travelling] Load Dummy Failure');


export const loadChildTravellingQuery = createAction('[Travelling] Load Child Travelling Query',
  props<{ pagination?: IPagination, searchQuery?: ITravellingSearchQuery }>());
export const loadChildTravellingQuerySuccess = createAction('[Travelling] Load Child Travelling Query Success',
  props<{ pagination: IPagination, travellings: ITravelling[] }>());
export const loadChildTravellingQueryFailure = createAction('[Travelling] Load Child Travelling Query Failure');


export const addNewPaymentSource = createAction('[Travelling] Add New Payment Source',
  props<{ paymentSource: IPaymentSource }>());
export const addNewPaymentSourceSuccess = createAction('[Travelling] Add New Payment Source Success',
  props<{ paymentSource: IPaymentSource }>());
export const addNewPaymentSourceFailure = createAction('[Travelling] Add New Payment Source Failure');


export const addNewLimit = createAction('[Travelling] Add New Limit',
  props<{ newLimit: IPaymentSourceLimit }>());
export const addNewLimitFailure = createAction('[Travelling] Add New Limit Failure');

export const removeLimit = createAction('[Travelling] Remove Limit',
  props<{ dummyCode: string, paymentSourceType: string }>());
export const removeLimitFailure = createAction('[Travelling] Remove Limit Failure');


export const updateAlert = createAction('[Travelling] Add New Alert',
  props<{ alert: IPaymentSourceAlert }>());
export const updateAlertFailure = createAction('[Travelling] Add New Alert Failure');

export const removeAlert = createAction('[Travelling] Remove Alert',
  props<{ dummyCode: string, paymentSourceType: string }>());
export const removeAlertFailure = createAction('[Travelling] Remove Alert Failure');

export const topUp = createAction('[Travelling] Top up',
  props<{ topup: IPaymentSourceTopup }>());
export const topupSuccess = createAction('[Travelling] Top up Success');
export const topUpFailure = createAction('[Travelling] Top up Failure');

export const updatePaymentSourcesSuccess = createAction('[Travelling] Update Payment Source Success');
