import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { ITravellingChildNgRxState } from '../store/travelling-child.reducer';
import { selectTravellingPagination, selectPaymentSource, selectPaymentSourcesUpdated } from '../store/travelling-child.selectors';
import { IDummyPaymentSources } from 'src/app/shared/models/travelling/travelling-table.interface';
import { loadChildTravellingQuery, loadDummy } from '../store/travelling-child.actions';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';

@Component({
  selector: 'app-travelling-child-content',
  templateUrl: './travelling-child-content.component.html',
  styleUrls: ['./travelling-child-content.component.scss']
})
export class TravellingChildContentComponent extends Unsubscriber {

  selectedTab = 0;
  travellingFieldTypes = ['travelling', 'paymentSource', 'limitsAndAlerts'];
  paymentSourceData: IDummyPaymentSources;
  dummyCode: string = this.activatedRoute.snapshot.paramMap.get('dummy');

  pagination: IPagination;
  pagination$: Observable<IPagination> = this.store.select(selectTravellingPagination);
  searchQuery: ISearchQuery;

  constructor(
    private store: Store<ITravellingChildNgRxState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.queryTravellings({ searchQuery: { dummyCode: this.dummyCode } });
    this.store.select(selectPaymentSource).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((paymentSourceData: IDummyPaymentSources) => this.paymentSourceData = paymentSourceData);

    this.store.select(selectPaymentSourcesUpdated).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => this.updateData());

    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => this.pagination = pagination);
  }

  updateData(): void {
    this.store.dispatch(loadDummy({ id: this.dummyCode }));
  }

  countTravellings(): number {
    return this.paymentSourceData?.paymentSources?.
      flatMap(source => source.travellings)?.length || null;
  }

  countPaymentSources(): number {
    return this.paymentSourceData?.paymentSources?.length || null;
  }

  countLimitsAlerts(): number {
    return this.paymentSourceData?.paymentSources?.
      flatMap(source => [source.limit, source.alert]).
      filter(item => item).
      length || null;
  }

  changePageNumber(pageNumber: number): void {
    this.pagination = {
      ...this.pagination,
      page: pageNumber
    };
    this.queryTravellings({});
  }

  queryTravellings(query: any): void {
    if (query?.pagination) {
      this.pagination = query.pagination;
    }

    if (query?.searchQuery) {
      this.searchQuery = query.searchQuery;
    }

    this.store.dispatch(loadChildTravellingQuery({
      pagination: this.pagination,
      searchQuery: this.searchQuery
    }));
  }
}
