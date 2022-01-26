import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


import { IPagination } from '../../../../shared/models/pagination.interface';
import { ITravellingNgRxState } from '../../store/travelling.reducer';
import { selectPagination, selectQuery } from '../../store/travelling.selectors';
import { loadDummyQuery } from '../../store/travelling.actions';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { DatePipe } from '@angular/common';
import { FILTER_NAMES } from 'src/app/shared/models/appConstants';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPaymentDialogComponent } from '../../child/content/dialogs/add-new-payment-dialog/add-new-payment-dialog.component';
import { IPaymentSourceRow } from 'src/app/shared/models/travelling/travelling-table.interface';
import { PAYMENT_SOURCE_TYPES } from 'src/app/shared/models/payment-source/payment-type.interface';
import { selectPaymentSourcesUpdated } from '../../child/store/travelling-child.selectors';

@Component({
  selector: 'app-travelling-master-content',
  templateUrl: './travelling-master-content.component.html',
  styleUrls: ['./travelling-master-content.component.scss']
})
export class TravellingMasterContentComponent extends Unsubscriber {
  columnsHeaders = ['dummy', 'paymentSource', 'paymentSourceStatus', 'currency', 'travelling', 'balance', 'lastCharged'];

  pagination: IPagination;
  tableData$: Observable<IPaymentSourceRow[]> = this.store.select(selectQuery);
  pagination$: Observable<IPagination> = this.store.select(selectPagination);
  activeFilters: [string, unknown][] = [];

  constructor(
    private store: Store<ITravellingNgRxState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlFilterService: UrlFilterService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    super();

    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => {
      this.pagination = pagination;
    });

    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(filters => {
      this.activeFilters = Object.entries(filters ?? {}).filter(entry => entry[1]);
      this.queryPaymentSources();
    });

    this.store.select(selectPaymentSourcesUpdated).pipe(
        takeUntil(this.unsubscribe)
    ).subscribe(() => this.queryPaymentSources());
  }

  navigateToDummy(element: IPaymentSourceRow): void {
    this.router.navigate(['travelling', element.dummyDTO.code]);
  }

  changePageNumber(updatedPageNumber: number): void {
    this.pagination = {...this.pagination, page: updatedPageNumber};
    this.queryPaymentSources();
  }

  changePageSize(updatedPageSize: number): void {
    this.pagination = {...this.pagination, size: updatedPageSize, page: 0};
    this.queryPaymentSources();
  }

  getFilterValue(activeFilter: [string, string]): string{
    return this.urlFilterService.getFilterValue(this.datePipe, activeFilter);
  }

  getFilterName(activeFilter: [string, string]): string{
    return FILTER_NAMES[activeFilter[0]];
  }

  getPaymentType(type: string): string {
    return PAYMENT_SOURCE_TYPES[type];
  }

  onChipRemove(filterName: string): void {
    this.activeFilters = this.activeFilters.filter(activeFilter => activeFilter[0] !== filterName);
    const searchQuery =  Object.fromEntries(this.activeFilters);
    this.router.navigate([searchQuery], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.urlFilterService.filterSubject.next(searchQuery);
  }

  openNewPaymentDialog(): void {
    this.dialog.open(AddNewPaymentDialogComponent, {
      width: '600px'
    }).afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => this.queryPaymentSources());
  }

  queryPaymentSources(): void {
    this.store.dispatch(loadDummyQuery({
      pagination: this.pagination,
      searchQuery: Object.fromEntries(this.activeFilters)}));
  }
}
