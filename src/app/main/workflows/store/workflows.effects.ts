import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as workflowsActions from './workflows.actions';
import { WorkflowsService } from '../service/workflows.service';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';

@Injectable()
export class WorkflowsEffects {

  loadWorkflowStats$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsActions.loadWorkflowStats),
    switchMap(() => {
      return this.workflowsService.getStats().pipe(
        map((stats) => {
          return workflowsActions.loadWorkflowStatsSuccess({ stats });
        }),
        catchError(() => {
          return of(workflowsActions.loadWorkflowStatsFailure());
        })
      );
    })
  ));

  loadWorkflowQuery$ = createEffect(() => this.actions$.pipe(
    ofType(workflowsActions.loadWorkflowQuery),
    switchMap(({ pagination, searchQuery }) => {
      this.spinnerService.enable();
      return this.workflowsService.getQuery(pagination, searchQuery).pipe(
        map((workflowQueryData) => {
          this.spinnerService.disable();
          return workflowsActions.loadWorkflowQuerySuccess({
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
          return of(workflowsActions.loadWorkflowQueryFailure());
        })
      );}
    )
  ));

  constructor(
    private actions$: Actions,
    private workflowsService: WorkflowsService,
    private spinnerService: LoadingSpinnerService
  ) {}
}
