import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { addNewPaymentSource } from '../../../store/travelling-child.actions';
import { DUMMY_NAMES } from 'src/app/shared/models/dummy';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { CURRENCIES } from 'src/app/shared/models/travelling/currency.interface';
import { IPaymentSource } from 'src/app/shared/models/travelling/travelling-table.interface';
import { PAYMENT_SOURCE_TYPES } from 'src/app/shared/models/payment-source/payment-type.interface';

class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return month + '/' + year;
  }
}
@Component({
  selector: 'app-add-new-payment-dialog',
  templateUrl: './add-new-payment-dialog.component.html',
  styleUrls: ['./add-new-payment-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform]
    },
  ]
})
export class AddNewPaymentDialogComponent {
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    dummy: new FormControl(null, Validators.required),
    paymentType: new FormControl(null, Validators.required),
    owner: new FormControl(),
    cardNo: new FormControl(),
    cvc: new FormControl(),
    expirationDate: new FormControl(),
    creditLimit: new FormControl(),
    currency: new FormControl(),
  });
  expirationDate: Date;
  today: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<ITravellingChildNgRxState>,
    private dialogRef: MatDialogRef<AddNewPaymentDialogComponent>,
  ) {
    if (data?.dummyCode) {
      this.form.controls.dummy.setValue(data.dummyCode);
      this.form.controls.dummy.disable();
    }

  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const paymentSource: IPaymentSource = {
      name: this.form.controls.name.value,
      dummyCode: this.form.controls.dummy.value,
      type: this.form.controls.paymentType.value,
      currency: this.form.controls.currency.value,
      balance: this.form.controls.creditLimit.value
    };

    if (this.form.controls.creditLimit.value){
      paymentSource.limit = {
        amount: this.form.controls.creditLimit.value
      };
    }

    if (this.isCard()) {
      paymentSource.details =  {
        owner: this.form.controls.owner.value,
        cardNo: this.form.controls.cardNo.value,
        expirationYear: this.expirationDate?.getFullYear(),
        expirationMonth: this.expirationDate?.getMonth(), // TODO check if +1 required
        cvc: this.form.controls.cvc.value,
      };
    }
    this.store.dispatch(addNewPaymentSource({ paymentSource } ));
    this.dialogRef.close();
  }

  getDummys(): string[]{
    return Object.keys(DUMMY_NAMES);
  }

  getDummyName(code): string{
    return DUMMY_NAMES[code.toLowerCase()];
  }

  getPaymentTypes(): string[]{
    return Object.keys(PAYMENT_SOURCE_TYPES);
  }

  getPaymentTypeName(code): string{
    return PAYMENT_SOURCE_TYPES[code];
  }


  getCurrencies(): string[]{
    return Object.keys(CURRENCIES);
  }

  getCurrencyName(code): string{
    return CURRENCIES[code];
  }

  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<any>): void {
    this.expirationDate = normalizedMonth;
    datepicker.close();
  }

  isCard(): boolean {
    return this.form.controls.paymentType.value === 'CARD';
  }
}
