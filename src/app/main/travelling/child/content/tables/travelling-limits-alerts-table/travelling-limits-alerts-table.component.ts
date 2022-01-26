import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddNewLimitDialogComponent } from '../../dialogs/add-new-limit-dialog/add-new-limit-dialog.component';
import { AddNewAlertDialogComponent } from '../../dialogs/add-new-alert-dialog/add-new-alert-dialog.component';
import { RemoveLimitDialogComponent } from '../../dialogs/remove-limit-dialog/remove-limit-dialog.component';
import { RemoveAlertDialogComponent } from '../../dialogs/remove-alert-dialog/remove-alert-dialog.component';
import { IDummyPaymentSources, IPaymentSource, IPaymentSourceAlert, IPaymentSourceLimit } from '../../../../../../shared/models/travelling/travelling-table.interface';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';

@Component({
  selector: 'app-travelling-limits-alerts-table',
  templateUrl: './travelling-limits-alerts-table.component.html',
  styleUrls: ['./travelling-limits-alerts-table.component.scss']
})
export class TravellingLimitsAlertsTableComponent extends Unsubscriber implements OnChanges {

  @Input() travellingData: IDummyPaymentSources;
  @Input() fieldName: string;
  @Input() dummyCode: string;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter<any>();

  limitsColumnHeaders =
    ['dateCreated', 'name', 'paymentSource', 'currency', 'limitAmount', 'currentTravelling', 'buttons-group'];
  alertsColumnHeaders =
    ['dateCreated', 'name', 'paymentSource', 'recipient', 'currency', 'balanceAlert', 'currentBalance', 'buttons-group'];

  limitsData: IPaymentSourceLimit [];
  alertsData: IPaymentSourceAlert [];
  paymentSourcesToLimit: IPaymentSource[];
  paymentSourcesToAlert: IPaymentSource[];

  constructor(
    private dialog: MatDialog
  ) {
    super();
   }

  ngOnChanges(): void {
    this.limitsData =  this.travellingData?.paymentSources?.
        filter(source => source.limit)
        .map(source => ({
          ...source.limit,
          paymentSourceType: source.type,
          paymentSourceName: source.name,
          dummyCode: source.dummyCode,
          currency: source.currency,
          currentTravelling: this.getcurrentTravelling(source)
        }))
        .filter(limit => limit),
    this.alertsData = this.travellingData?.paymentSources?.
        filter(source => source.alert)
        .map(source => ({
          ...source.alert,
          paymentSourceType: source.type,
          paymentSourceName: source.name,
          dummyCode: source.dummyCode,
          currency: source.currency,
          balance: source.balance
        }));
    this.paymentSourcesToLimit = this.travellingData?.paymentSources?.
        filter(source => !source.limit);
    this.paymentSourcesToAlert = this.travellingData?.paymentSources?.
        filter(source => !source.alert);
  }
  getcurrentTravelling(source: IPaymentSource): number {
    const result = source.limit?.amount ? (source.limit.amount - source.balance) : null;
    return result < 0 ? 0 : result;
  }

  addNewLimit(): void {
    this.dialog.open( AddNewLimitDialogComponent, {
        width: '600px',
        data: {
          paymentSources: this.paymentSourcesToLimit,
          dummyCode: this.dummyCode,
        }
      });
  }

  updateAlert(): void {
    this.dialog.open( AddNewAlertDialogComponent, {
      width: '600px',
      data: {
        paymentSources: this.paymentSourcesToAlert,
        dummyCode: this.dummyCode,
      }
    });
  }

  editLimit(limit: IPaymentSourceLimit): void {
    this.dialog.open( AddNewLimitDialogComponent, {
        width: '600px',
        data: {
          paymentSources: this.travellingData?.paymentSources?.
            filter(source => source.type === limit?.paymentSourceType),
          dummyCode: this.dummyCode,
          limit
        }
      });
  }

  editAlert(alert: IPaymentSourceAlert): void {
    this.dialog.open( AddNewAlertDialogComponent, {
      width: '600px',
      data: {
        paymentSources: this.travellingData?.paymentSources?.
          filter(source => source.type === alert.paymentSourceType),
        dummyCode: this.dummyCode,
        alert
      }
    });
  }

  removeLimit(limit: IPaymentSourceLimit): void {
    this.dialog.open( RemoveLimitDialogComponent, {
      width: '600px',
      data: {
        paymentSourceType: limit.paymentSourceType,
        dummyCode: this.dummyCode,
        name: limit.name
      }
    });
  }

  removeAlert(alert: IPaymentSourceAlert): void {
    this.dialog.open( RemoveAlertDialogComponent, {
      width: '600px',
      data: {
        paymentSourceType: alert.paymentSourceType,
        dummyCode: this.dummyCode,
        name: alert.name
      }
    });
  }
}
