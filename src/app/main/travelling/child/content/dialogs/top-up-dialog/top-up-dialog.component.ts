import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { topUp } from '../../../store/travelling-child.actions';
import { IPaymentSourceTopup } from 'src/app/shared/models/travelling/travelling-table.interface';

@Component({
  selector: 'app-top-up-dialog',
  templateUrl: './top-up-dialog.component.html',
  styleUrls: ['./top-up-dialog.component.scss']
})
export class TopUpDialogComponent {

  fieldTopUpAmount = new FormControl(null, Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<ITravellingChildNgRxState>,
    private dialogRef: MatDialogRef<TopUpDialogComponent>
  ) { }

  onTopUp(): void {
    if (this.fieldTopUpAmount.invalid) {
      return;
    }
    const topup: IPaymentSourceTopup = {
      dummyCode: this.data?.dummyCode,
      paymentSourceType: this.data?.paymentSourceType,
      amount: this.fieldTopUpAmount.value
    };
    this.store.dispatch(topUp({ topup }));
    this.dialogRef.close();
  }
}
