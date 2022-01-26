import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LABELING_FIELD_TYPES } from 'src/app/shared/models/appConstants';

@Component({
  selector: 'app-create-field-dialog',
  templateUrl: './create-field-dialog.component.html',
  styleUrls: ['./create-field-dialog.component.scss']
})
export class CreateFieldDialogComponent {
  form: FormGroup;
  fieldTypes = LABELING_FIELD_TYPES;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<string>
    ) {
      this.form = new FormGroup({
        fieldName: new FormControl(this.data.name),
        fieldType: new FormControl(this.data.type),
        fieldValue: new FormControl(this.data.value)
      });
    }

  save(): void {
    this.dialogRef.close({
      name: this.form.controls.fieldName.value,
      type: this.form.controls.fieldType.value,
      value: this.form.controls.fieldValue.value
    });
  }
}
