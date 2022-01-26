import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';

import { IValidationsChildNgRxState } from '../store/validations-child.reducer';
import { selectValidation } from '../store/validations-child.selectors';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { doValidationChildAction, loadValidation } from '../store/validations-child.actions';
import { IValidationLabeling } from 'src/app/shared/models/validation/validation-labeling.interface';
import { DUMMY_NAMES } from 'src/app/shared/models/dummy';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowAction } from 'src/app/shared/models/workflow/workflows.constants';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-validations-child-header',
  templateUrl: './validations-child-header.component.html',
  styleUrls: ['./validations-child-header.component.scss']
})
export class ValidationsChildHeaderComponent extends Unsubscriber {
  validation: IValidationLabeling;
  validationId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private store: Store<IValidationsChildNgRxState>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
    this.store.dispatch(loadValidation({ id: this.validationId } ));
    this.store.select(selectValidation).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((validation) => this.validation = validation );
  }

  getFlagCount(): number {
    const rawData = this.validation?.raw?.data;
    return (
      rawData?.basic?.filter(field => field.flag).length
      + rawData?.extended?.filter(field => field.flag).length
      + rawData?.relatedParty?.filter(field => field.flag).length
      + rawData?.filing?.filter(field => field.flag).length
    );
  }

  getDummyName(code): string {
    return DUMMY_NAMES[code];
  }

  restartWorkflow(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Restart Workflow',
        title: 'restarting the workflow will remove all extracted data and it\'s child workflows.' +
          ' are you sure you want to restart it?'}
    });
    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doValidationChildAction({
        id: this.validation._iBrumaId,
        action: WorkflowAction.restart }));
    });
  }

  markAsValidated(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Mark as Validated',
        title: 'Are you sure you want to mark this workflow as validated'}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.store.dispatch(doValidationChildAction({
        id: this.validation._iBrumaId,
        action: WorkflowAction.complete }));
    });
  }
}
