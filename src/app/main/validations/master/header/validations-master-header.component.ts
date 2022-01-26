import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';


import { IValidationsNgRxState } from '../../store/validations.reducer';
import { selectPagination, selectValidationDates, selectValidationFlags } from '../../store/validations.selectors';
import { loadValidationStats } from '../../store/validations.actions';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { IStat } from 'src/app/shared/models/stat.interface';
import { loadWorkflowStats } from 'src/app/main/workflows/store/workflows.actions';


@Component({
  selector: 'app-validations-master-header',
  templateUrl: './validations-master-header.component.html',
  styleUrls: ['./validations-master-header.component.scss']
})
export class ValidationsMasterHeaderComponent extends Unsubscriber implements OnInit {
  pagination: IPagination;
  flagTypes: IStat[];
  dateIntervals: IStat[];

  constructor(private store: Store<IValidationsNgRxState>) {
    super();
    this.store.dispatch(loadValidationStats());
    this.store.dispatch(loadWorkflowStats());
  }

  ngOnInit(): void {
    this.store.select(selectPagination).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((pagination) => this.pagination = pagination);
    this.store.select(selectValidationFlags).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((flagTypes) => this.flagTypes = flagTypes);
    this.store.select(selectValidationDates).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((dateIntervals) => this.dateIntervals = dateIntervals);
  }
}
