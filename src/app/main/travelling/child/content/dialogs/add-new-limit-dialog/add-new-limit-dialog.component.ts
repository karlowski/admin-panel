import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IPaymentSourceLimit } from 'src/app/shared/models/travelling/travelling-table.interface';
import { addNewLimit } from '../../../store/travelling-child.actions';
import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';

@Component({
  selector: 'app-add-new-limit-dialog',
  templateUrl: './add-new-limit-dialog.component.html',
  styleUrls: ['./add-new-limit-dialog.component.scss']
})
export class AddNewLimitDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddNewLimitDialogComponent>,
    private store: Store<ITravellingChildNgRxState>
  ) {
    this.form = new FormGroup({
      paymentSourceType: new FormControl(null, Validators.required),
      fieldLimitName: new FormControl(this.data.limit?.name, Validators.required),
      fieldLimitAmount: new FormControl(this.data.limit?.amount, Validators.required)
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
    const newLimit: IPaymentSourceLimit = {
      dummyCode: this.data?.dummyCode,
      paymentSourceType: this.form.controls.paymentSourceType.value,
      name: this.form.controls.fieldLimitName.value,
      amount: this.form.controls.fieldLimitAmount.value
    };
    this.store.dispatch(addNewLimit({ newLimit }));
    this.dialogRef.close();
  }
}
