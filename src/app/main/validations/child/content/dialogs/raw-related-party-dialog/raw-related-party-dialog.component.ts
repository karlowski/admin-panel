import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelingRawField } from 'src/app/shared/models/validation/labeling/field';

@Component({
  selector: 'app-raw-related-party-dialog',
  templateUrl: './raw-related-party-dialog.component.html',
  styleUrls: ['./raw-related-party-dialog.component.scss']
})
export class RawRelatedPartyDialogComponent {
  form: FormGroup;
  newParty: boolean;
  fields: LabelingRawField[];
  namePrefix = 'rp-name-';
  valuePrefix = 'rp-value-';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<string>) {
    this.newParty = data.newParty;
    this.form = new FormGroup({});
    this.fields = data.fields;
    if (!(this.fields?.length > 0)){
      this.fields.push({name: '', value: ''});
    }
    this.fields.forEach((field: LabelingRawField, index: number) => this.addFieldToForm(field, index));
  }

  addFieldToForm(field: LabelingRawField, index: number): void {
    this.form.addControl(`${this.namePrefix}${index}`, new FormControl(field.name));
    this.form.addControl(`${this.valuePrefix}${index}`, new FormControl(field.value));
  }
  addAttribute(): void {
    this.addFieldToForm({name: '', value: ''}, this.fields.length);
    this.fields.push({name: '', value: ''});
  }

  deleteAttribute(index: number): void {
    this.form.removeControl(`${this.namePrefix}${index}`);
    this.form.removeControl(`${this.valuePrefix}${index}`);
    this.fields.splice(index, 1);
  }

  save(): void {
    this.dialogRef.close(
      this.fields.map((field, index) => ({
        name: this.form.controls[`${this.namePrefix}${index}`].value,
        value: this.form.controls[`${this.valuePrefix}${index}`].value
      })));
  }
}
