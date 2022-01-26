import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { IPagination } from '../../../shared/models/pagination.interface';
import { ApiService } from '../../../shared/services/api.service';
import { IPaymentSource, IPaymentSourceTopup, IDummyPaymentSources, IPaymentSourceLimit, IPaymentSourceAlert } from '../../../shared/models/travelling/travelling-table.interface';
import { ITravellingStats } from 'src/app/shared/models/travelling/travelling-stats.interface';
import { IPatchOperation } from 'src/app/shared/models/validation/patch-operation.interface';
import { IPaymentSourceQuery } from 'src/app/shared/models/payment-source/payment-source-query.interface';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { IPaymentSourceSearchQuery } from 'src/app/shared/models/payment-source/payment-source-search-query.interface';
import { ITravellingSearchQuery } from 'src/app/shared/models/travelling/travelling-search-query.interface';
import { ITravellingQueryResult } from 'src/app/shared/models/travelling/travelling-query-result.interface';

@Injectable({
  providedIn: 'root'
})

export class PaymentSourceService extends ApiService {

  constructor(
    protected injector: Injector,
    private paginationService: PaginationService) {
    super(injector);
  }

  getQuery(pagination?: IPagination, searchQuery?: IPaymentSourceSearchQuery): Observable<IPaymentSourceQuery> {
    const _pagination = this.paginationService.setAndGetPagination(pagination);
    return super.get('payment', { params: { ..._pagination, ...searchQuery } });
  }

  getDummyPaymentSources(dummyCode: string, pagination?: IPagination): Observable<IDummyPaymentSources> {
    const _pagination = this.paginationService.setAndGetPagination(pagination);
    return super.get(`payment/${dummyCode}`, { params: {..._pagination }});
  }

  addNewPaymentSource(paymentSource: IPaymentSource): Observable<void> {
    const patchOperation: IPatchOperation = {
      op:  'add',
      path: `/-`,
      value: paymentSource
    };
    return super.patch(`payment/${paymentSource.dummyCode}/${paymentSource.type}`, patchOperation);
  }

  addNewLimit(newLimit: IPaymentSourceLimit): Observable<any> {
    const patchOperation: IPatchOperation = {
      op:  'add',
      path: `/0/limit`,
      value: {
        amount: newLimit.amount,
        name: newLimit.name,
        createdAt: new Date()
      }
    };
    return super.patch(`payment/${newLimit.dummyCode}/${newLimit.paymentSourceType}`, patchOperation);
  }

  updateAlert(newAlert: IPaymentSourceAlert): Observable<any> {
    const patchOperation: IPatchOperation = {
      op:  'add',
      path: `/0/alert`,
      value: {
        amount: newAlert.amount,
        name: newAlert.name,
        recipient: newAlert.recipient
      }
    };
    return super.patch(`payment/${newAlert.dummyCode}/${newAlert.paymentSourceType}`, patchOperation);
  }

  removeField(fieldName: string, dummyCode: string, paymentSourceType: string): Observable<any> {
    const patchOperation: IPatchOperation = {
      op:  'remove',
      path: `/0/${fieldName}`
    };
    return super.patch(`payment/${dummyCode}/${paymentSourceType}`, patchOperation);
  }

  topUp(topupRequest: IPaymentSourceTopup): Observable<void> {
    return super.post('payment/topup', topupRequest);
  }

  queryTravellings(pagination?: IPagination, searchQuery?: ITravellingSearchQuery): Observable<ITravellingQueryResult> {
    const _pagination = this.paginationService.setAndGetPagination(pagination);
    return super.get(`travelling`, { params: { ..._pagination, ...searchQuery } });
  }


  getStats(): Observable<ITravellingStats> {
    return super.get('travelling/stats');
 }
}
