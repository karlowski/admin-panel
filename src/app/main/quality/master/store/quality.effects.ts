import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as qualityActions from './quality.actions';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';
import { QualityService } from '../../service/quality.service';



@Injectable()
export class QualityEffects {

  loadWorkflowStats$ = createEffect(() => this.actions$.pipe(
    ofType(qualityActions.loadQuality),
    switchMap(() => {
      return this.qualityService.getQuality().pipe(
        map((quality) => {
          return qualityActions.loadQualitySuccess({ quality });
        }),
        catchError(() => {
          return of(qualityActions.loadQualityFailure());
        })
      );
    })
  ));

  loadQualityQuery$ = createEffect(() => this.actions$.pipe(
    ofType(qualityActions.loadQualityQuery),
    switchMap(({ searchQuery }) => {
      this.spinnerService.enable();
      return this.qualityService.getQuery(searchQuery).pipe(
        map((qualityTableData) => {
          this.spinnerService.disable();
          return qualityActions.loadQualityQuerySuccess({
            qualityTableData
          });
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(qualityActions.loadQualityQueryFailure());
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private qualityService: QualityService,
    private spinnerService: LoadingSpinnerService
  ) {}
}
