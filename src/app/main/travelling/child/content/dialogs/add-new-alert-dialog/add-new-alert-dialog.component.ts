import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPaymentSourceAlert } from 'src/app/shared/models/travelling/travelling-table.interface';
import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { Store } from '@ngrx/store';
import { updateAlert } from '../../../store/travelling-child.actions';

@Component({
  selector: 'app-add-new-alert-dialog',
  templateUrl: './add-new-alert-dialog.component.html',
  styleUrls: ['./add-new-alert-dialog.component.scss']
})
export class AddNewAlertDialogComponent {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddNewAlertDialogComponent>,
    private store: Store<ITravellingChildNgRxState>
  ) {
    this.form = new FormGroup({
      fieldAlertName: new FormControl(this.data.alert?.name, Validators.required),
      fieldAlertAmount: new FormControl(this.data.alert?.amount, Validators.required),
      fieldAlertEmail: new FormControl(this.data.alert?.recipient, Validators.required),
      paymentSourceType: new FormControl(null, Validators.required),
    });
    if (data.paymentSources?.length === 1){
      this.form.controls.paymentSourceType.setValue(data.paymentSources[0].type);
      this.form.controls.paymentSourceType.disable();
    }
   }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const alert: IPaymentSourceAlert = {
      dummyCode: this.data?.dummyCode,
      paymentSourceType: this.form.controls.paymentSourceType.value,
      name: this.form.controls.fieldAlertName.value,
      amount: this.form.controls.fieldAlertAmount.value,
      recipient: this.form.controls.fieldAlertEmail.value
    };
    this.store.dispatch(updateAlert({ alert }));
    this.dialogRef.close();
  }
}
