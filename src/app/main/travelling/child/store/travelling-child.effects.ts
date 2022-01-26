import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as childTravellingActions from './travelling-child.actions';
import { TravellingToasterService } from '../../service/travelling-toaster.service';
import { PaymentSourceService } from '../../service/payment-source.service';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';


@Injectable()
export class TravellingChildEffects {

  loadDummy$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.loadDummy),
    switchMap(({ id }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.getDummyPaymentSources(id).pipe(
        map(( dummyPaymentSources ) => {
          this.spinnerService.disable();
          return childTravellingActions.loadDummySuccess({ dummyPaymentSources });
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(childTravellingActions.loadDummyFailure());
        })
      );
    })
  ));

  loadChildTravellingQuery$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.loadChildTravellingQuery),
    switchMap(({ pagination, searchQuery }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.queryTravellings(pagination, searchQuery).pipe(
      map((travellingQueryData) =>  {
        this.spinnerService.disable();
        return childTravellingActions.loadChildTravellingQuerySuccess({
          pagination: {
            size: travellingQueryData.size,
            page: travellingQueryData.number,
            totalPages: travellingQueryData.totalPages,
            sort: travellingQueryData.sort,
            totalElements: travellingQueryData.totalElements
          },
          travellings: travellingQueryData.content
        });
      }),
      catchError(() => {
        this.spinnerService.disable();
        return of(childTravellingActions.loadChildTravellingQueryFailure);
      })
    );
    })
  ));
  addNewPaymentSource$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.addNewPaymentSource),
    switchMap(({ paymentSource }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.addNewPaymentSource(paymentSource).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showSuccess('Success adding new payment source for whole account');
          return childTravellingActions.updatePaymentSourcesSuccess();
        }),
        catchError((err) => {
          this.spinnerService.disable();
          this.toasterService.showError('There was a problem. Please try again later', err);
          return of(childTravellingActions.addNewPaymentSourceFailure());
        })
      );})
  ));


  addNewLimit$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.addNewLimit),
    switchMap(({ newLimit }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.addNewLimit(newLimit).pipe(
        map(() => {
          this.toasterService.showSuccess('Success adding limit to payment source');
          this.spinnerService.disable();
          return childTravellingActions.updatePaymentSourcesSuccess();
        }),
        catchError((err) => {
          this.toasterService.showError('There was a problem. Please try again later', err);
          this.spinnerService.disable();
          return of(childTravellingActions.addNewLimitFailure());
        })
      );})
  ));

  updateAlert$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.updateAlert),
    switchMap(({ alert }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.updateAlert(alert).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showSuccess('Success adding alert to payment source');
          return childTravellingActions.updatePaymentSourcesSuccess();
        }),
        catchError((err) => {
          this.spinnerService.disable();
          this.toasterService.showError('There was a problem. Please try again later', err);
          return of(childTravellingActions.updateAlertFailure());
        })
      );})
  ));

  removeLimit$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.removeLimit),
    switchMap(({ dummyCode, paymentSourceType }) =>  {
      this.spinnerService.enable();
      return this.paymentSourceService.removeField('limit', dummyCode, paymentSourceType).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showSuccess('You\'ve removed limit successfully');
          return childTravellingActions.updatePaymentSourcesSuccess();
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(childTravellingActions.removeLimitFailure());
        })
      );})
  ));

  removeAlert$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.removeAlert),
    switchMap(({ dummyCode, paymentSourceType }) => {
        this.spinnerService.enable();
        return this.paymentSourceService.removeField('alert', dummyCode, paymentSourceType).pipe(
          map(() => {
            this.spinnerService.disable();
            this.toasterService.showSuccess('You\'ve removed alert successfully');
            return childTravellingActions.updatePaymentSourcesSuccess();
          }),
          catchError(() => {
            this.spinnerService.disable();
            return of(childTravellingActions.removeAlertFailure());
          })
      );})
  ));

  topUp$ = createEffect(() => this.actions$.pipe(
    ofType(childTravellingActions.topUp),
    switchMap(({ topup }) => {
      this.spinnerService.enable();
      return this.paymentSourceService.topUp(topup).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showSuccess('You\'ve succesfully added funds to your account');
          return childTravellingActions.topupSuccess();
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(childTravellingActions.topUpFailure());
        })
      );})
  ));

  constructor(
    private actions$: Actions,
    private paymentSourceService: PaymentSourceService,
    private toasterService: TravellingToasterService,
    private spinnerService: LoadingSpinnerService
  ) {
  }
}
