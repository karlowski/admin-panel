import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ITravellingSearchQuery } from 'src/app/shared/models/travelling/travelling-search-query.interface';
import { ITravelling, IDummyPaymentSources } from 'src/app/shared/models/travelling/travelling-table.interface';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { PAYMENT_SOURCE_TYPES } from 'src/app/shared/models/payment-source/payment-type.interface';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { loadChildTravellingQuery } from '../../../store/travelling-child.actions';
import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { selectTravelling, selectTravellingPagination, selectTravellingsUpdated } from '../../../store/travelling-child.selectors';

@Component({
  selector: 'app-travelling-table',
  templateUrl: './travelling-table.component.html',
  styleUrls: ['./travelling-table.component.scss']
})
export class TravellingTableComponent extends Unsubscriber {
  @Input() paymentSourceData: IDummyPaymentSources;
  @Output() queryEmitter: EventEmitter<{searchQuery: ISearchQuery, pagination: IPagination}> = new EventEmitter<any>();

  dummyCode: string = this.activatedRoute.snapshot.paramMap.get('dummy');
  pagination: IPagination;
  pagination$: Observable<IPagination> = this.store.select(selectTravellingPagination);
  travellings: ITravelling[];
  travellingColumnsHeaders = ['date', 'paymentSource', 'currency', 'amount', 'workflowFireWorks', 'type'];

  form = new FormGroup({
    paymentSource: new FormControl(),
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
      private store: Store<ITravellingChildNgRxState>,
      private activatedRoute: ActivatedRoute){
    super();
    this.store.select(selectTravelling).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((travellingData: ITravelling[]) => this.travellings = travellingData);

    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => this.pagination = pagination);

    this.store.select(selectTravellingsUpdated).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(() => this.queryTravellings());
  }

  changePageNumber(page: number): void {
    this.pagination = {
      ...this.pagination,
      page
    }
    this.queryTravellings();
  }

  changePageSize(size: number): void {
    this.pagination = {
      ...this.pagination,
      page: 0,
      size
    }
    this.queryTravellings();
  }

  queryTravellings(): void {
    const searchQuery: ITravellingSearchQuery = {
      dummyCode: this.dummyCode
    };
    if (this.form.controls.paymentSource?.value){
      searchQuery.paymentSourceId = this.form.controls.paymentSource.value;
    }
    if (this.form.controls.start?.value){
      searchQuery.createdStart = this.form.controls.start.value.getTime();
    }
    if (this.form.controls.end?.value){
      searchQuery.createdEnd = this.form.controls.end.value.getTime();
    }

    this.queryEmitter.emit({
      pagination: this.pagination,
      searchQuery
    });
  }

  getPaymentTypeName(code): string{
    return PAYMENT_SOURCE_TYPES[code];
  }
}
