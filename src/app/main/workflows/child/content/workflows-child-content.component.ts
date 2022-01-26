import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  selectChildPagination,
  selectChildWorkflowStates, selectChildWorkflowStatuses,
  selectWorkflowChildTableData
} from '../store/workflows-child.selectors';
import {
  doWorkflowChildAction,
  loadWorkflowChildQuery,
  loadWorkflowChildStats
} from '../store/workflows-child.actions';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IWorkflowsChildNgRxState } from '../store/workflows-child.reducer';
import { IStat } from 'src/app/shared/models/stat.interface';
import { ISearchQuery } from '../../../../shared/models/search-query.interface';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { WorkflowAction } from '../../../../shared/models/workflow/workflows.constants';

@Component({
  selector: 'app-workflows-child-content',
  templateUrl: './workflows-child-content.component.html',
  styleUrls: ['./workflows-child-content.component.scss']
})
export class WorkflowsChildContentComponent extends Unsubscriber implements OnInit{
  columnsHeaders = ['dummy', 'childWorkflows', 'state', 'createdAt',  'lastUpdated', 'status', 'button-group'];
  workflowId = this.activatedRoute.snapshot.queryParams.id;
  pagination: IPagination;

  tableData$ = this.store.select(selectWorkflowChildTableData);
  states$: Observable<IStat[]> = this.store.select(selectChildWorkflowStates);
  statuses$: Observable<IStat[]> = this.store.select(selectChildWorkflowStatuses);
  pagination$: Observable<IPagination> = this.store.select(selectChildPagination);

  form: FormGroup = new FormGroup({
    state: new FormControl(),
    status: new FormControl(),
    createdBy: new FormControl(),
    customer: new FormControl()
  });

  constructor(
    private store: Store<IWorkflowsChildNgRxState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadWorkflowChildQuery({ id: this.workflowId }));
    this.store.dispatch(loadWorkflowChildStats());
    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((pagination) => this.pagination = pagination);
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((searchQueryForm) => {
      const searchQuery: ISearchQuery = {
        ...searchQueryForm,
        createdBy: searchQueryForm.createdBy ? searchQueryForm.createdBy.getTime() : null
      };
      for (const prop in searchQuery) {
        if (!searchQuery[prop]) {
          delete searchQuery[prop];
        }
      }
      this.store.dispatch(loadWorkflowChildQuery({
            id: this.workflowId,
            pagination: this.pagination,
            searchQuery
        }
      ));
    });
  }

  onSendValidation(id: string, name: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Send for Validation',
        title: 'Are you sure you want to send this workflow for validation?', name}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id, action: WorkflowAction.validate }));
    });
  }

  onMarkAsComplete(id: string, name: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Mark as Complete',
        title: 'Are you sure you want to mark this workflow as complete?', name}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id, action: WorkflowAction.complete }));
    });
  }

  onRefreshExtractedData(id: string, name: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Refresh Extracted Data',
        title: 'Are you sure you want to switch to refresh extracted data for this workflow?', name}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id, action: WorkflowAction.copy }));
    });
  }

  onRestartWorkflow(id: string, name: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Restart Workflow',
        title: 'restarting the workflow will remove all extracted data and it\'s child workflows.' +
          ' are you sure you want to restart: ', name}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id, action: WorkflowAction.restart }));
    });
  }

  changePageNumber(updatedPageNumber: number): void {
    this.store.dispatch(loadWorkflowChildQuery({ id: this.workflowId, pagination:  { ...this.pagination, page: updatedPageNumber }}));
  }

  changePageSize(updatedPageSize): void {
    this.store.dispatch(loadWorkflowChildQuery({ id: this.workflowId, pagination:  { ...this.pagination, page: updatedPageSize } }));
  }
}
