import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as validationsChildActions from './validations-child.actions';
import { ValidationsService } from '../../service/validations.service';
import { ValidationToasterService } from '../../service/validation-toaster.service';
import { selectValidation } from './validations-child.selectors';
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';

@Injectable()
export class ValidationsChildEffects {
  loadValidationChildStats$ = createEffect(() => this.actions$.pipe(
    ofType(validationsChildActions.loadValidationChildStats),
    switchMap(() => {
      return this.validationsService.getStats().pipe(
        map((stats) => {
          return validationsChildActions.loadValidationChildStatsSuccess({ stats });
        }),
        catchError(() => {
          return of(validationsChildActions.loadValidationChildStatsFailure());
        })
      );
    })
  ));

  loadValidation$ = createEffect(() => this.actions$.pipe(
    ofType(
      validationsChildActions.loadValidation,
      validationsChildActions.saveFieldSuccess
    ),
    switchMap(({ id }) => {
      this.spinnerService.enable();
      return this.validationsService.getValidation(id).pipe(
        map((validationLabeling) => {
          this.spinnerService.disable();
          return validationsChildActions.loadValidationSuccess({ validationLabeling });
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(validationsChildActions.loadValidationFailure());
        })
      );
    })
  ));

  saveField$ = createEffect(() => this.actions$.pipe(
    ofType(validationsChildActions.saveField),
    switchMap(({ labelingId, patchOperation, validationId }) => {
      this.spinnerService.enable();
      return this.validationsService.saveField(labelingId, patchOperation).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showPatchSuccess(patchOperation);
          return validationsChildActions.saveFieldSuccess({ id: validationId });
        }),
        catchError(({error}) => {
          this.spinnerService.disable();
          this.toasterService.showFieldSavedError('workflow', error);
          return of(validationsChildActions.saveFieldFailure());
        })
      );})
  ));

  updateField$ = createEffect(() => this.actions$.pipe(
    ofType(validationsChildActions.updateField),
    switchMap(({ labelingId, patchOperation }) => {
      this.spinnerService.enable();
      return this.validationsService.saveField(labelingId, patchOperation).pipe(
        map(() => {
          this.spinnerService.disable();
          this.toasterService.showPatchSuccess(patchOperation);
          return validationsChildActions.updateFieldSuccess({ patchOperation });
        }),
        catchError(({ error }) => {
          this.spinnerService.disable();
          this.toasterService.showFieldSavedError('workflow', error);
          return of(validationsChildActions.updateFieldFailure());
        })
      )
    })
  ));

  doValidationChildAction$ = createEffect(() => this.actions$.pipe(
    ofType(validationsChildActions.doValidationChildAction),
    switchMap(({ id, action }) => {
      this.spinnerService.enable();
      return this.validationsService.doAction(id, action).pipe(
        map((validation) => {
          this.spinnerService.disable();
          this.toasterService.showActionSuccess(action);
          return validationsChildActions.doValidationChildActionSuccess(validation);
        }),
        catchError((error) => {
          this.spinnerService.disable();
          this.toasterService.showActionFailure(action, error);
          return of(validationsChildActions.doValidationChildActionFailure());
        })
      );
    })
  ));

  purchaseDocument$ = createEffect(() => this.actions$.pipe(
    ofType(validationsChildActions.purchaseDocument),
    withLatestFrom(this.store$.select(selectValidation)),
    switchMap(([{ documentId }, { _iBrumaId }]) => {
      this.spinnerService.enable();
      return this.validationsService.purchaseDocument(documentId).pipe(
        switchMap((item) => {
          this.spinnerService.disable();
          return [ validationsChildActions.documentPurchased({ item }) ];
        }),
        catchError(() => {
          this.spinnerService.disable();
          return of(validationsChildActions.documentNotPurchased());
        }));
    })
  ));

  constructor(
    private actions$: Actions,
    private store$: Store,
    private toasterService: ValidationToasterService,
    private validationsService: ValidationsService,
    private spinnerService: LoadingSpinnerService
  ) {}
}
