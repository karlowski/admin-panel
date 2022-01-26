import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

import { TravellingChildHeaderComponent } from './child/header/travelling-child-header.component';
import { TravellingChildComponent } from './child/travelling-child.component';
import { TravellingMasterComponent } from './master/travelling-master.component';
import { TravellingMasterContentComponent } from './master/content/travelling-master-content.component';
import { TravellingMasterHeaderComponent } from './master/header/travelling-master-header.component';
import { SharedModule } from '../../shared/shared.module';
import { TravellingChildContentComponent } from './child/content/travelling-child-content.component';
import { AddNewPaymentDialogComponent } from './child/content/dialogs/add-new-payment-dialog/add-new-payment-dialog.component';
import { TravellingStatusComponent } from './master/content/travelling-status/travelling-status.component';
import { TravellingLimitsAlertsTableComponent } from './child/content/tables/travelling-limits-alerts-table/travelling-limits-alerts-table.component';
import { AddNewLimitDialogComponent } from './child/content/dialogs/add-new-limit-dialog/add-new-limit-dialog.component';
import { AddNewAlertDialogComponent } from './child/content/dialogs/add-new-alert-dialog/add-new-alert-dialog.component';
import { RemoveLimitDialogComponent } from './child/content/dialogs/remove-limit-dialog/remove-limit-dialog.component';
import { RemoveAlertDialogComponent } from './child/content/dialogs/remove-alert-dialog/remove-alert-dialog.component';
import { TopUpDialogComponent } from './child/content/dialogs/top-up-dialog/top-up-dialog.component';
import { TravellingTableComponent } from './child/content/tables/travelling-table/travelling-table.component';
import { PaymentSourceTableComponent } from './child/content/tables/payment-source-table/payment-source-table.component';

@NgModule({
  declarations: [
    TravellingChildHeaderComponent,
    TravellingChildComponent,
    TravellingMasterComponent,
    TravellingMasterHeaderComponent,
    TravellingMasterContentComponent,
    TravellingChildContentComponent,
    AddNewPaymentDialogComponent,
    TravellingStatusComponent,
    TravellingTableComponent,
    PaymentSourceTableComponent,
    TravellingLimitsAlertsTableComponent,
    AddNewLimitDialogComponent,
    AddNewAlertDialogComponent,
    RemoveLimitDialogComponent,
    RemoveAlertDialogComponent,
    TopUpDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TravellingMasterComponent
      },
      {
        path: ':dummy',
        component: TravellingChildComponent
      }
    ]),
    MatIconModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class TravellingModule { }
