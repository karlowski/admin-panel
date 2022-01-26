import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LABELING_FIELD_TYPES } from 'src/app/shared/models/appConstants';
import { DocumentDialogResponse } from 'src/app/shared/models/validation/labeling/field';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.scss']
})
export class AddDocumentDialogComponent {

  form: FormGroup;
  documentTypes = LABELING_FIELD_TYPES;

  private file: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<string>
    ) {
      this.form = new FormGroup({
        documentName: new FormControl(data.document?.name),
        documentType: new FormControl(data.document?.type),
        file: new FormControl(),
      });
  }

  setFile($event): void {
    this.form.controls.file.patchValue($event);
  }

  save(): void {
    const response: DocumentDialogResponse = {
      type: this.form.controls.documentType.value,
      name: this.form.controls.documentName.value,
      file: this.file
    };
    this.dialogRef.close(response);
  }

  handleFileChange(file: File): void{
    this.file = file;
  }

  compareTypes(object1: any, object2: any): boolean {
    return object1 && object2 && object1.id === object2.id;
  }
}
