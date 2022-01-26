import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unsubscriber } from '../../../../../../shared/unsubscriber.class';
import { AddNewPaymentDialogComponent } from '../../dialogs/add-new-payment-dialog/add-new-payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TopUpDialogComponent } from '../../dialogs/top-up-dialog/top-up-dialog.component';
import { IPaymentSource } from 'src/app/shared/models/travelling/travelling-table.interface';
import { PAYMENT_SOURCE_TYPES } from 'src/app/shared/models/payment-source/payment-type.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-source-table',
  templateUrl: './payment-source-table.component.html',
  styleUrls: ['./payment-source-table.component.scss']
})
export class PaymentSourceTableComponent extends Unsubscriber {

  @Input() paymentSources: IPaymentSource[];
  @Input() dummyCode: string;
  @Output() updateEmitter: EventEmitter<void> = new EventEmitter<void>();

  paymentSourceColumnsHeaders = ['dateCreated', 'name', 'status', 'paymentOption',
     'balance', 'currency', 'lastTopUpDate', 'lastTopUpAmount', 'remainingBalance', 'top-up'];

  constructor(private dialog: MatDialog) {
    super();
  }

  onAddNewPayment(): void {
    this.dialog.open(AddNewPaymentDialogComponent, {
      width: '600px',
      data: { dummyCode: this.dummyCode }
    }).afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => this.updateEmitter.emit());
  }

  onTopUp(paymentSource: IPaymentSource): void {
    this.dialog.open(TopUpDialogComponent, {
      width: '600px',
      data: {
        paymentSourceType: paymentSource.type,
        dummyCode: this.dummyCode
      }
    }).afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => this.updateEmitter.emit());
  }

  getTypeName(type: string): string {
    return PAYMENT_SOURCE_TYPES[type];
  }
}
