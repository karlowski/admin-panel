import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AddDocumentDialogComponent } from 'src/app/main/validations/child/content/dialogs/add-document-dialog/add-document-dialog.component';
import { DocumentService } from 'src/app/main/validations/service/document.service';
import { ValidationToasterService } from 'src/app/main/validations/service/validation-toaster.service';
import { DocumentDialogResponse, LabelingDocument } from 'src/app/shared/models/validation/labeling/field';
import { toCapitalizedWords } from 'src/app/shared/models/util/text.util';
import { IValidationFieldChange } from 'src/app/shared/models/validation/validation-field-change';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';

@Component({
  selector: 'app-validations-document-table',
  templateUrl: './validations-document-table.component.html',
  styleUrls: ['./validations-document-table.component.scss']
})
export class ValidationsDocumentTableComponent extends Unsubscriber implements OnInit {

  @Input() tableData: LabelingDocument [];
  @Input() fieldName: string;
  @Input() isMapped: boolean;
  @Input() labelingId: string;
  @Output() updateField: EventEmitter<IValidationFieldChange> = new EventEmitter<IValidationFieldChange>();

  columnsHeaders: string[];
  rawColumnHeaders = ['flag', 'flagType', 'name', 'documentType', 'effectiveAt', 'document'];
  mappedColumnHeaders = ['flag', 'flagType', 'name', 'documentType', 'processed', 'mlScore', 'mlPrecision', 'effectiveAt', 'document'];
  lastChargedField: IValidationFieldChange = null;

  constructor(private dialog: MatDialog,
              private toasterService: ValidationToasterService,
              private documentService: DocumentService
    ){
    super();
  }

  ngOnInit(): void {
    this.columnsHeaders = this.isMapped ? this.mappedColumnHeaders : this.rawColumnHeaders;
  }

  toCapitalizedWords(): string {
    return toCapitalizedWords(this.fieldName);
  }

  openUploadDialog(document: LabelingDocument, newDocument: boolean ): void {
    const addDocumentDialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '600px',
      data: { document, isRaw: !this.isMapped }
    });

    addDocumentDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((addDocumentResponse: DocumentDialogResponse) => {
      if (newDocument){
        this.uploadNewDocument(addDocumentResponse, document);
      } else{
        this.replaceDocument(addDocumentResponse, document);
      }
    });
  }

  uploadNewDocument(addDocumentResponse: DocumentDialogResponse, document: LabelingDocument): void {
    this.documentService.uploadDocument({
        labelingId: this.labelingId,
        type: addDocumentResponse.type,
        name: addDocumentResponse.name,
        raw: !this.isMapped,
      }, addDocumentResponse.file)
    .subscribe((documentId) => {
      this.toasterService.showSuccess('new document uploaded successfully');
      const idAttribute = this.isMapped ? 'url' : 'value';
      if (document){
        document.modified = true;
        document[idAttribute] = documentId;
      } else{
        const newField = {
          name: addDocumentResponse.name,
          [idAttribute]: documentId,
          modified: true
        };
        if (!this.isMapped){
          newField.type = addDocumentResponse.type;
        }
        this.tableData = [ ...this.tableData, newField];
      }
    });
  }

  replaceDocument(addDocumentResponse: DocumentDialogResponse, document: LabelingDocument): void {
    this.documentService
    .replaceDocument(document.url, addDocumentResponse.file)
    .subscribe(() => {
      this.toasterService.showSuccess('document replaced successfully');
      document.modified = true;
    });
  }
}
