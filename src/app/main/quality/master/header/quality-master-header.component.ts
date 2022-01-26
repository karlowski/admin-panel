import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IQualityNgRxState } from '../store/quality.reducer';
import { Store } from '@ngrx/store';
import { loadQualityQuery } from '../store/quality.actions';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { takeUntil } from 'rxjs/operators';
import { ISearchQuery } from 'src/app/shared/models/search-query.interface';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-quality-master-header',
  templateUrl: './quality-master-header.component.html',
  styleUrls: ['./quality-master-header.component.scss']
})
export class QualityMasterHeaderComponent extends Unsubscriber {
  dateIntervals: number[] = [7, 30, 90];
  selectedDateInterval: number;
  form = new FormGroup({
    createdStart: new FormControl(),
    createdEnd: new FormControl(),
  });

  constructor(
    private store: Store<IQualityNgRxState>,
    private urlFilterService: UrlFilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
    super();
    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(searchQuery => {
      this.form.controls.createdStart.setValue(searchQuery ? new Date(+searchQuery.createdStart) : null);
      this.form.controls.createdEnd.setValue(searchQuery ? new Date(+searchQuery.createdEnd) : null);
      this.loadTableData(searchQuery);
    });
  }

  loadTableData(searchQuery?: ISearchQuery): void {
    this.store.dispatch(loadQualityQuery({ searchQuery }));
  }

  setDateInterval(selectedDateInterval: number): void {
    if (this.selectedDateInterval === selectedDateInterval) {
      this.selectedDateInterval = null;
      this.form.controls.createdStart.setValue(null);
      this.form.controls.createdEnd.setValue(null);
    }else {
      this.selectedDateInterval = selectedDateInterval;
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - selectedDateInterval);
      this.form.controls.createdEnd.setValue(endDate);
      this.form.controls.createdStart.setValue(startDate);
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
