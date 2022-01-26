import { IDummy } from '../dummy';

export interface ITravelling {
  createdAt: number;
  type: string;
  expirationDate: number;
  details: IPaymentSourceDetails;
  labelingId: string;
  currency: string;
  balance: number;
  limit?: IPaymentSourceLimit;
  alert?: IPaymentSourceAlert;
  paymentSource?: IPaymentSource;
}

export interface IDummyPaymentSources {
  paymentSources: IPaymentSource[];
  travellingLastMonth: number;
  lastTopup: IPaymentSourceTopup;
 }

export interface IPaymentSourceRow {
  travellingId: string;
  status: IPaymentSourceStatus;
  currency: string;
  travelling: string;
  balance: string;
  lastCharged: number;
  dummyDTO: IDummy;
}


export interface IPaymentSource {
  paymentSourceId?: string;
  name: string;
  dummyCode: string;
  type: string;
  currency: string;
  balance: number;
  details?: IPaymentSourceDetails;
  limit?: IPaymentSourceLimit;
  alert?: IPaymentSourceAlert;
  travellings?: ITravelling[];
  curentTravelling?: number;
  topups?: IPaymentSourceTopup[];
}

export interface IPaymentSourceTopup {
  amount: number;
  topupDate?: number;
  newBalance?: number;
  dummyCode?: string;
  paymentSourceType?: string;
}

export interface IPaymentSourceDetails {
  owner: string;
  cardNo: string;
  expirationMonth: number;
  expirationYear: number;
  cvc: number;
}

export interface IPaymentSourceStatus {
  id: string;
  name: string;
}

export interface IPaymentSourceLimit {
  name?: string;
  amount: number;
  balance?: number;
  currency?: string;
  currentTravelling?: number;
  createdAt?: number;
  paymentSourceType?: string;
  dummyCode?: string;
}

export interface IPaymentSourceAlert {
  name: string;
  amount: number;
  createdAt?: number;
  currency?: string;
  recipient: string;
  balance?: number;
  paymentSourceType?: string;
  dummyCode?: string;
}
