import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IPagination } from 'src/app/shared/models/pagination.interface';
import { IQualityChildData } from 'src/app/shared/models/quality/quality-child-data.iterface';
import { IQuality, IQualityTableRow } from 'src/app/shared/models/quality/quality-table.interface';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';
import { ApiService } from 'src/app/shared/services/api.service';

const mockedQuality: IQuality = {
    basicFields: 1,
    extendedFields: 1,
    npRelatedParties: 1,
    leRelatedParties: 1,
    npUbo: 1,
    leUbo: 1,
    mlScore: 1,
    mlPrecision: 1,
    registryDataQuality: 'Medium'
};

@Injectable({
  providedIn: 'root'
})
export class QualityService extends ApiService {

  constructor(protected injector: Injector) {
    super(injector);
  }

  getQuery(searchQuery?: ISearchQuery): Observable<IQualityTableRow[]> {
    return super.get('quality', { params: { ...searchQuery } });
  }

  getQuality(): Observable<IQuality> {
    return of(mockedQuality);
  }

  getQualityChildData(dummyCode: string, searchQuery: ISearchQuery, pagination?: IPagination): Observable<IQualityChildData> {
    return super.get(`quality/${dummyCode}`, { params: { ...pagination, ...searchQuery }});
  }
}
