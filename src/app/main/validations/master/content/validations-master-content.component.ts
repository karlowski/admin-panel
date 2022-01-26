import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { IValidationsNgRxState } from '../../store/validations.reducer';
import {
  selectPagination, selectValidationTableData,
} from '../../store/validations.selectors';
import { loadValidationQuery } from '../../store/validations.actions';
import { IValidationTableRow } from '../../../../shared/models/validation/validation-table.interface';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import {  IPagination } from '../../../../shared/models/pagination.interface';
import { Observable } from 'rxjs';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { DatePipe } from '@angular/common';
import { FILTER_NAMES } from 'src/app/shared/models/appConstants';


@Component({
  selector: 'app-validations-master-content',
  templateUrl: './validations-master-content.component.html',
  styleUrls: ['./validations-master-content.component.scss']
})
export class ValidationsMasterContentComponent extends Unsubscriber{
  columnsHeaders = ['workflow', 'dummy', 'flaggedFields', 'state', 'status'];
  pagination: IPagination;
  pagination$: Observable<IPagination> = this.store.select(selectPagination);
  tableData$ = this.store.select(selectValidationTableData);
  activeFilters: [string, unknown][] = [];

  constructor(
    private store: Store<IValidationsNgRxState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlFilterService: UrlFilterService,
    private datePipe: DatePipe
    ) {
    super();
    this.store.dispatch(loadValidationQuery({}));
    this.store.select(selectPagination).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((pagination) => this.pagination = pagination);

    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(filters => {
      this.activeFilters = Object.entries(filters ?? {}).filter(entry => entry[1]);
    });
  }

  changePageNumber(updatedPageNumber: number): void {
    this.store.dispatch(loadValidationQuery({ pagination:  { ...this.pagination, page: updatedPageNumber } }));
  }

  changePageSize(updatedPageSize): void {
    this.store.dispatch(loadValidationQuery({ pagination:  { ...this.pagination, size: updatedPageSize, page: 0 } }));
  }

  openDetails(element: IValidationTableRow): void {
    this.router.navigate(['validation', element.workflowId]);
  }

  getFilterValue(activeFilter: [string, string]): string{
    return this.urlFilterService.getFilterValue(this.datePipe, activeFilter);
  }

  getFilterName(activeFilter: [string, string]): string{
    return FILTER_NAMES[activeFilter[0]];
  }

  onChipRemove(filterName: string): void {
    this.activeFilters = this.activeFilters.filter(activeFilter => activeFilter[0] !== filterName);
    const searchQuery =  Object.fromEntries(this.activeFilters);
    this.router.navigate([searchQuery], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.urlFilterService.filterSubject.next(searchQuery);
    this.store.dispatch(loadValidationQuery({ pagination: this.pagination, searchQuery }));
  }
}
