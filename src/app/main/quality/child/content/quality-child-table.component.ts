import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { loadQualityChild } from '../store/quality-child.actions';
import { selectBreakdown, selectChart, selectQualityPagination } from '../store/quality-child.selectors';
import { IQualityChildNgRxState } from '../store/quality-child.reducer';
import { filter, takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { IPagination } from 'src/app/shared/models/pagination.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quality-child-table',
  templateUrl: './quality-child-table.component.html',
  styleUrls: ['./quality-child-table.component.scss']
})
export class QualityChildTableComponent extends Unsubscriber{
  columnsHeaders = ['createdAt', 'workflow', 'basicFields', 'extendedFields', 'filing', 'data', 'mlScore', 'mlPrecision'];
  tableData$ = this.store.select(selectBreakdown);
  dummyCode: string = this.activatedRoute.snapshot.paramMap.get('dummy');

  pagination: IPagination;
  pagination$: Observable<IPagination> = this.store.select(selectQualityPagination);

  form = new FormGroup({
    createdStart: new FormControl(),
    createdEnd: new FormControl(),
  });

  constructor(
    private store: Store<IQualityChildNgRxState>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private urlFilterService: UrlFilterService
  ) {
    super();

    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(searchQuery => {
      this.form.controls.createdStart.setValue(searchQuery ? new Date(+searchQuery.createdStart) : null);
      this.form.controls.createdEnd.setValue(searchQuery ? new Date(+searchQuery.createdEnd) : null);
      this.loadQualityChild(searchQuery);
    });

    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => this.pagination = pagination);
  }

  loadQualityChild(searchQuery?: ISearchQuery): void {
    this.store.dispatch(loadQualityChild({ dummyCode: this.dummyCode, searchQuery }));
  }

  changePageNumber(pageNumber: number): void {
    this.pagination = {
      ...this.pagination,
      page: pageNumber
    };
    this.queryQuality();
  }

  changePageSize(size: number): void {
    this.pagination = {
      ...this.pagination,
      page: 0,
      size
    }
    this.queryQuality();
  }

  queryQuality(): void {
    const searchQuery: ISearchQuery = {
      createdStart: this.form.controls.createdStart.value?.getTime(),
      createdEnd: this.form.controls.createdEnd.value?.getTime()
    };
    for (const prop in searchQuery) {
      if (!searchQuery[prop]) {
        delete searchQuery[prop];
      }
    }
    this.router.navigate([searchQuery], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.urlFilterService.filterSubject.next(searchQuery);
  }

  clearForm(): void {
    this.router.navigate([{}], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.urlFilterService.filterSubject.next(null);
  }

  isFormEntered(): boolean {
    return this.form.controls.createdStart.value && this.form.controls.createdEnd.value;
  }
}
