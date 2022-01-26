import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ITravellingChildNgRxState } from '../../../store/travelling-child.reducer';
import { removeLimit } from '../../../store/travelling-child.actions';

@Component({
  selector: 'app-remove-limit-dialog',
  templateUrl: './remove-limit-dialog.component.html',
  styleUrls: ['./remove-limit-dialog.component.scss']
})
export class RemoveLimitDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RemoveLimitDialogComponent>,
    private store: Store<ITravellingChildNgRxState>
) { }

  onRemove(): void {
    this.store.dispatch(removeLimit({
      dummyCode: this.data?.dummyCode,
      paymentSourceType: this.data?.paymentSourceType,
    }));
    this.dialogRef.close();
  }
}
