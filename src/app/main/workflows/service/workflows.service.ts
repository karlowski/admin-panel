import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../../shared/services/api.service';
import { IWorkflowQuery } from '../../../shared/models/workflow/workflow-query.interface';
import { IWorkflowStats } from '../../../shared/models/workflow/workflow-stats.interface';
import { IWorkflowTableRow } from '../../../shared/models/workflow/workflows-table.interface';
import { IPagination } from '../../../shared/models/pagination.interface';
import { ICompany } from '../../start/company.interface';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { mergeMap, reduce } from 'rxjs/operators';
import { ISearchQuery } from '../../../shared/models/search-query.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService extends ApiService{

  constructor(protected injector: Injector,
              private urlFilterService: UrlFilterService,
              private paginationService: PaginationService) {
    super(injector);
  }

  getStats(): Observable<IWorkflowStats> {
    return super.get('labeling/stats');
  }

  getQuery(pagination?: IPagination, searchQuery?: ISearchQuery): Observable<IWorkflowQuery> {
    // tslint:disable-next-line:variable-name
    const _searchQuery = this.urlFilterService.getWorkflowFilters(searchQuery);
    // tslint:disable-next-line:variable-name
    const _pagination = this.paginationService.setAndGetPagination(pagination);

    return super.get('labeling', { params: { ..._pagination, ..._searchQuery } });
  }

  getWorkflow(id: string): Observable<IWorkflowTableRow> {
    return super.get(`labeling/${id}`);
  }

  getWorkflowChildQuery(id: string, pagination?: IPagination, searchQuery?: ISearchQuery): Observable<IWorkflowQuery> {
    return super.get(`labeling/${id}/children`, { params: { pageable: pagination, filter: searchQuery } });
  }

  doAction(id: string, action): Observable<IWorkflowTableRow> {
    return super.post(`labeling/${id}/${action.toUpperCase()}`, {});
  }

  searchCompanies(searchTerm: string): Observable<ICompany[]> {
    return of('lu', 'de', 'fr', 'gb', 'be', 'ch').pipe(
      mergeMap(dummy => super.get(`workflow/query`, { params: { dummyCode: dummy, searchTerm } })),
      reduce((acc, value) => acc.concat(value), []),
    );
  }
  postCompany(data: ICompany): Observable<any> {
    return super.post(`workflow/start`, {
        rawData: data,
        createdBy: { userId: 'TODO' }
      }, {
        responseType: 'text'
      });
  }
}
