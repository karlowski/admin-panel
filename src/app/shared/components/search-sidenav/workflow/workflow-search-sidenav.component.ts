import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';

import { IWorkflowsNgRxState } from '../../../../main/workflows/store/workflows.reducer';
import {
  selectPagination,
  selectWorkflowStates,
  selectWorkflowStatuses } from '../../../../main/workflows/store/workflows.selectors';
import { Unsubscriber } from '../../../unsubscriber.class';
import { IPagination } from '../../../models/pagination.interface';
import { IStat } from '../../../models/stat.interface';
import { DUMMY_NAMES } from '../../../models/dummy';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlFilterService } from '../../../services/urlFilterService';
import { ISearchQuery } from '../../../models/search-query.interface';
import { loadWorkflowQuery } from '../../../../main/workflows/store/workflows.actions';

@Component({
  selector: 'app-workflow-search-sidenav',
  templateUrl: './workflow-search-sidenav.component.html',
  styleUrls: ['./workflow-search-sidenav.component.scss']
})
export class WorkflowSearchSidenavComponent extends Unsubscriber implements OnInit {
  @Input() drawer: MatDrawer;
  states: IStat[] = [];
  statuses: IStat[] = [];
  pagination: IPagination;
  form: FormGroup = new FormGroup({
    state: new FormControl(),
    status: new FormControl(),
    dummy: new FormControl(),
    createdStart: new FormControl(),
    createdEnd: new FormControl()
  });

  constructor(private store: Store<IWorkflowsNgRxState>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private urlFilterService: UrlFilterService
    ) {
    super();

    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(filters => {
      if (!filters) {
        return;
      }
      this.form.controls.state.setValue(filters.state);
      this.form.controls.status.setValue(filters.status);
      this.form.controls.dummy.setValue(filters.dummy);

      if (filters.createdStart) {
        this.form.controls.createdStart.setValue(new Date(+filters.createdStart));
      }

      if (filters.createdEnd) {
        this.form.controls.createdEnd.setValue(new Date(+filters.createdEnd));
      }
    });
  }

  ngOnInit(): void {
    this.store.select(selectWorkflowStates).subscribe(states => this.states = states);
    this.store.select(selectWorkflowStatuses).subscribe(statuses => this.statuses = statuses);
    this.store.select(selectPagination).pipe(
      takeUntil(this.unsubscribe),
      filter((workflowQuery => Boolean(workflowQuery)))
    ).subscribe((pagination) => this.pagination = pagination);
  }

  onSubmit(): void {
    const searchQuery: ISearchQuery = {
      ...this.form.getRawValue(),
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
    this.store.dispatch(loadWorkflowQuery({ pagination: this.pagination, searchQuery }));
  }

  onRefresh(): void {
    this.form.reset();
  }

  getDummys(): string[]{
    return Object.keys(DUMMY_NAMES);
  }

  getDummyName(code): string{
    return DUMMY_NAMES[code.toLowerCase()];
  }
}
