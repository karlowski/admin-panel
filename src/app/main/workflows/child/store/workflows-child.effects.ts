import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as workflowsChildActions from './workflows-child.actions';
import { WorkflowsService } from '../../service/workflows.service';
import { WorkflowToasterService } from '../../service/workflow-toaster.service';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';

@Injectable()
export class WorkflowsChildEffects {
  loadWorkflowChildStats$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsChildActions.loadWorkflowChildStats),
    switchMap(() => {
      return this.workflowsService.getStats().pipe(
        map((stats) => {
          return workflowsChildActions.loadWorkflowChildStatsSuccess({ stats });
        }),
        catchError(() => {
          return of(workflowsChildActions.loadWorkflowChildStatsFailure());
        })
      );
    })
  ));

  loadWorkflowChildQuery$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsChildActions.loadWorkflowChildQuery),
    switchMap(({ id, pagination, searchQuery }) => {
      this.spinnerService.enable();
      return this.workflowsService.getWorkflowChildQuery(id, pagination, searchQuery).pipe(
        map((workflowQueryData) => {
          this.spinnerService.disable();
          return workflowsChildActions.loadWorkflowChildQuerySuccess({
              pagination: {
                size: workflowQueryData.size,
                page: workflowQueryData.number,
                totalPages: workflowQueryData.totalPages,
                sort: workflowQueryData.sort,
                totalElements: workflowQueryData.totalElements
              },
            workflowTableData: workflowQueryData.content
          });
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(workflowsChildActions.loadWorkflowChildQueryFailure());
        })
      );
    })
  ));

  loadWorkflow$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsChildActions.loadWorkflow),
    switchMap(({ id }) => {
      return this.workflowsService.getWorkflow(id).pipe(
        map((workflow) => {
          return workflowsChildActions.loadWorkflowSuccess({ workflow });
        }),
        catchError(() => {
          return of(workflowsChildActions.loadWorkflowFailure());
        })
      );
    })
  ));

  doWorkflowChildAction$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsChildActions.doWorkflowChildAction),
    switchMap(({ id, action }) => {
      this.spinnerService.enable();
      return this.workflowsService.doAction(id, action).pipe(
        map((workflow) => {
          this.toasterService.showActionSuccess(action);
          this.spinnerService.disable();
          return workflowsChildActions.doWorkflowChildActionSuccess(workflow);
        }),
        catchError((error) => {
          this.toasterService.showActionFailure(action, error);
          this.spinnerService.disable();
          return of(workflowsChildActions.doWorkflowChildActionFailure());
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private toasterService: WorkflowToasterService,
    private workflowsService: WorkflowsService,
    private spinnerService: LoadingSpinnerService
  ) {}
}
