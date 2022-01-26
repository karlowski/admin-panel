import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../../shared/services/api.service';
import { IValidationQuery } from '../../../shared/models/validation/validation-query.interface';
import { IValidationStats } from '../../../shared/models/validation/validation-stats.interface';
import { IValidationSearchQuery } from '../../../shared/models/validation/validation-search-query';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { IValidationLabeling } from 'src/app/shared/models/validation/validation-labeling.interface';
import { IPatchOperation } from 'src/app/shared/models/validation/patch-operation.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService extends ApiService{

  constructor(protected injector: Injector,
              private urlFilterService: UrlFilterService,
              private paginationService: PaginationService) {
    super(injector);
  }

  getStats(): Observable<IValidationStats> {
    return super.get('validation/stats');
  }

  getQuery(pagination?: IPagination, searchQuery?: IValidationSearchQuery): Observable<IValidationQuery> {
    const searchQueryParams = this.urlFilterService.getWorkflowFilters(searchQuery);
    const paginationParams = this.paginationService.setAndGetPagination(pagination);
    return super.get('validation', { params: { ...paginationParams, ...searchQueryParams } });
  }

  getValidation(id: string): Observable<IValidationLabeling> {
    return super.get(`validation/${id}`);
  }

  saveField(labelingId: string, patchOperation: IPatchOperation): Observable<void> {
    return super.patch(`validation/${labelingId}`, patchOperation);
  }

  doAction(id: string, action): Observable<IValidationLabeling> {
    return super.post(`validation/${id}/${action.toUpperCase()}`, {});
  }

  purchaseDocument(documentId: string): Observable<any> {
    return of({
      documentId,
      url: 'set value',
    });
  }
}
