import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as childQualityActions from './quality-child.actions';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';
import { QualityService } from '../../service/quality.service';


@Injectable()
export class QualityChildEffects {
  loadQualityChildData$ = createEffect(() => this.actions$.pipe(
    ofType(childQualityActions.loadQualityChild),
    switchMap(({ dummyCode, searchQuery, pagination }) => {
      this.spinnerService.enable();
      return this.qualityService.getQualityChildData(dummyCode, searchQuery, pagination).pipe(
        map(({chart, workflows }) => {
          this.spinnerService.disable();
          return childQualityActions.loadQualityChildSuccess({
            chart,
            workflows: workflows.content,
            pagination: {
              size: workflows.size,
              page: workflows.number,
              totalPages: workflows.totalPages,
              sort: workflows.sort,
              totalElements: workflows.totalElements
            }
          });
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(childQualityActions.loadQualityChildFailure());
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private qualityService: QualityService,
    private spinnerService: LoadingSpinnerService) {
  }
}
