import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IWorkflowsNgRxState } from '../../store/workflows.reducer';
import { selectPagination, selectWorkflowStates, selectWorkflowStatuses } from '../../store/workflows.selectors';
import { loadWorkflowStats } from '../../store/workflows.actions';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { IStat, IStatList } from 'src/app/shared/models/stat.interface';

@Component({
  selector: 'app-workflows-master-header',
  templateUrl: './workflows-master-header.component.html',
  styleUrls: ['./workflows-master-header.component.scss']
})
export class WorkflowsMasterHeaderComponent extends Unsubscriber implements OnInit {
  states$: Observable<IStat[]> = this.store.select(selectWorkflowStates);
  statuses$: Observable<IStat[]> = this.store.select(selectWorkflowStatuses);
  pagination: IPagination;
  states: IStatList;
  statuses: IStatList;

  constructor(private store: Store<IWorkflowsNgRxState>) {
    super();
    this.store.dispatch(loadWorkflowStats());
  }

  ngOnInit(): void {
    this.store.select(selectPagination).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((pagination) => this.pagination = pagination);
    this.store.select(selectWorkflowStates).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((states) => this.states = {list: states, name: 'state'});
    this.store.select(selectWorkflowStatuses).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((statuses) => this.statuses = {list: statuses, name: 'status'});
  }
}
