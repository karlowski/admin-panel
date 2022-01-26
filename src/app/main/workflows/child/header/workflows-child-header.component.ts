import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { IWorkflowTableRow } from '../../../../shared/models/workflow/workflows-table.interface';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { doWorkflowChildAction, loadWorkflow } from '../store/workflows-child.actions';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { WorkflowAction, WorkflowsStatus } from '../../../../shared/models/workflow/workflows.constants';
import { IWorkflowsChildNgRxState } from '../store/workflows-child.reducer';
import { selectWorkflow } from '../store/workflows-child.selectors';

@Component({
  selector: 'app-workflows-child-header',
  templateUrl: './workflows-child-header.component.html',
  styleUrls: ['./workflows-child-header.component.scss']
})
export class WorkflowsChildHeaderComponent extends Unsubscriber implements OnInit {
  workflow: IWorkflowTableRow;
  workflowId = this.activatedRoute.snapshot.queryParams.id;

  constructor(
    private store: Store<IWorkflowsChildNgRxState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(loadWorkflow({ id: this.workflowId } ));
    this.store.select(selectWorkflow).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((workflow) => this.workflow = workflow);
  }

   getStatusClass(): string {
    switch (this.workflow.status.id) {
      case WorkflowsStatus.completed:
      case WorkflowsStatus.running:
        return 'green';
      case WorkflowsStatus.invalid:
        return 'invalid';
      default:
        return 'warning';
    }
  }

  onSendValidation(item: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Send for Validation',
        title: 'Are you sure you want to send for validation workflow:', item}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id: this.workflowId, action: WorkflowAction.validate }));
    });
  }

  onMarkAsComplete(item: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Mark as Complete',
        title: 'Are you sure you want to mark as complete workflow:', item}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id: this.workflowId, action: WorkflowAction.complete }));
    });
  }

  onRefreshExtractedData(item: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Refresh Extracted Data',
        title: 'Are you sure you want to switch to refresh extracted data in the workflow:', item}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id: this.workflowId, action: WorkflowAction.copy }));
    });
  }

  onRestartWorkflow(item: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Restart Workflow',
        title: 'restarting the workflow will remove all extracted data and it\'s child workflows.' +
          ' are you sure you want to restart: ',
        item}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doWorkflowChildAction({ id: this.workflowId, action: WorkflowAction.restart }));
    });
  }
}
