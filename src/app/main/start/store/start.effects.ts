import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as startActions from './start.actions';
import { WorkflowsService } from '../../workflows/service/workflows.service';
import { StarterToasterService } from '../service/starter-toaster.service';

@Injectable()
export class StartEffects {
  loadCompanyList$ = createEffect(() => this.actions$.pipe(
    ofType(startActions.loadCompanyList),
    switchMap(({ searchTerm }) => {
      return this.workflowsService.searchCompanies(searchTerm).pipe(
        map((extractions) => {
          return startActions.loadCompanyListSuccess({ extractions });
        }),
        catchError(() => {
          return of(startActions.loadCompanyListFailure());
        })
      );
    })
  ));

  submitCompany$ = createEffect(() => this.actions$.pipe(
    ofType(startActions.submitCompany),
    switchMap(({ startData }) => {
      return this.workflowsService.postCompany(startData).pipe(
        map((workflowId: string) => {
          this.toasterService.showStartSuccess();
          return startActions.submitCompanySuccess({workflowId});
        }),
        catchError((error) => {
          this.toasterService.showStartFailure(error);
          return of(startActions.submitCompanyFailure());
        })
      );
    })
  ));

  constructor(
    private toasterService: StarterToasterService,
    private actions$: Actions,
    private workflowsService: WorkflowsService
  ) {}
}
