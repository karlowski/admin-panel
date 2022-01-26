import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { removeAlert } from '../../../store/travelling-child.actions';

@Component({
  selector: 'app-remove-alert-dialog',
  templateUrl: './remove-alert-dialog.component.html',
  styleUrls: ['./remove-alert-dialog.component.scss']
})
export class RemoveAlertDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RemoveAlertDialogComponent>,
    private store: Store<ITravellingChildNgRxState>
  ) { }



  onRemove(): void {
    this.store.dispatch(removeAlert({
      dummyCode: this.data?.dummyCode,
      paymentSourceType: this.data?.paymentSourceType,
    }));
    this.dialogRef.close();
  }

}
