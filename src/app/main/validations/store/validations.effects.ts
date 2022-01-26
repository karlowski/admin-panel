import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as validationsActions from './validations.actions';
import { ValidationsService } from '../service/validations.service';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';

@Injectable()
export class ValidationsEffects {

  loadValidationStats$ = createEffect(() => this.actions$.pipe(
    ofType(validationsActions.loadValidationStats),
    switchMap(() => this.validationsService.getStats().pipe(
        map((stats) => validationsActions.loadValidationStatsSuccess({ stats })),
        catchError(() => {
          return of(validationsActions.loadValidationStatsFailure());
        })
      ))
  ));

  loadValidationQuery$ = createEffect(() => this.actions$.pipe(
    ofType(validationsActions.loadValidationQuery),
    switchMap(({ pagination, searchQuery }) => {
      this.spinnerService.enable();
      return this.validationsService.getQuery(pagination, searchQuery).pipe(
        map((validationQueryData) => {
          this.spinnerService.disable();
          return validationsActions.loadValidationQuerySuccess({
              pagination: {
                size: validationQueryData.size,
                page: validationQueryData.number,
                totalPages: validationQueryData.totalPages,
                sort: validationQueryData.sort,
                totalElements: validationQueryData.totalElements
              },
            validationTableData: validationQueryData.content
          });}),
        catchError(() => {
          this.spinnerService.disable();
          return of(validationsActions.loadValidationQueryFailure());
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    // private toastr: ToastrService,
    private validationsService: ValidationsService,
    private spinnerService: LoadingSpinnerService

  ) {}
}
