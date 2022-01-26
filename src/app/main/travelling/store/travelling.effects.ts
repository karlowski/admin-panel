import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PaymentSourceService } from '../service/payment-source.service';
import * as travellingActions from './travelling.actions';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';

@Injectable()
export class TravellingEffects {

  loadTravellingStats$ = createEffect(() => this.actions$.pipe(
    ofType(travellingActions.loadDateStats),
    switchMap(() => this.paymentSourceService.getStats().pipe(
        map((stats) => travellingActions.loadDateStatsSuccess({ stats })),
        catchError(() => {
          return of(travellingActions.loadDateStatsFailure);
        })
      ))
  ));

  loadDummyQuery$ = createEffect(() => this.actions$.pipe(
    ofType(travellingActions.loadDummyQuery),
    switchMap(({ pagination, searchQuery }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.getQuery(pagination, searchQuery).pipe(
      map((paymentSourceQueryData) => {
        this.spinnerService.disable();
        return travellingActions.loadDummyQuerySuccess({
          pagination: {
            size: paymentSourceQueryData.size,
            page: paymentSourceQueryData.number,
            totalPages: paymentSourceQueryData.totalPages,
            sort: paymentSourceQueryData.sort,
            totalElements: paymentSourceQueryData.totalElements
          },
          paymentSourceTableData: paymentSourceQueryData.content
        });
      }),
      catchError(() => {
        this.spinnerService.disable();
        return of(travellingActions.loadDummyQueryFailure);
      })
    );})
  ));

  constructor(
    private actions$: Actions,
    private paymentSourceService: PaymentSourceService,
    private spinnerService: LoadingSpinnerService

  ) {}
}
