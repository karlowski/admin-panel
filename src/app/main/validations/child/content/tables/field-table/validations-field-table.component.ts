import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LabelingRawField } from 'src/app/shared/models/validation/labeling/field';
import { toCapitalizedWords } from 'src/app/shared/models/util/text.util';
import { IValidationFieldChange } from 'src/app/shared/models/validation/validation-field-change';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { IValidationsChildNgRxState } from '../../../store/validations-child.reducer';
import { selectLastChildUpdated, selectSaveField } from '../../../store/validations-child.selectors';
import { CreateFieldDialogComponent } from '../../dialogs/create-field-dialog/create-field-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-validations-field-table',
  templateUrl: './validations-field-table.component.html',
  styleUrls: ['./validations-field-table.component.scss']
})
export class ValidationsFieldTableComponent extends Unsubscriber implements OnInit {

  @Input() tableData: LabelingRawField[];
  @Input() fieldName: string;
  @Output() updateField: EventEmitter<IValidationFieldChange> = new EventEmitter<IValidationFieldChange>();

  columnsHeaders = ['flag', 'flagType', 'name', 'source', 'fieldType', 'value'];
  lastChargedField: IValidationFieldChange = null;
  isLastChildUpdated = false;

  constructor(
    private dialog: MatDialog,
    private store: Store<IValidationsChildNgRxState>,
  ){
    super();
  }
  ngOnInit(): void {
    this.store.select(selectSaveField).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(() => {
      if (!this.lastChargedField){
        return;
      }
      if (this.lastChargedField.index === -1){
        this.tableData[this.tableData.length - 1].modified = true;
      }else{
        this.tableData[this.lastChargedField.index].value = this.lastChargedField.field?.value;
        this.tableData[this.lastChargedField.index].modified = true;
      }
      this.lastChargedField = null;
    });
    this.store.select(selectLastChildUpdated).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe((isLastChildUpdated) => {
      this.isLastChildUpdated = isLastChildUpdated;
    })


  }

  toCapitalizedWords(): string {
    return toCapitalizedWords(this.fieldName);
  }

  createField(): void {
    const addFieldDialogRef = this.dialog.open(CreateFieldDialogComponent, {
      width: '600px',
      data: { fieldName: toCapitalizedWords(this.fieldName) }
    });

    addFieldDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe((newField) => {
      this.lastChargedField = {
        field: newField,
        index: -1
      };
      this.updateField.emit(this.lastChargedField);
    });
  }

  confirmEditValue(fieldIndex: number, newValue: string): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'change ' + this.tableData[fieldIndex].name,
        title: 'Are you sure you want to change',
        item: this.tableData[fieldIndex].name,
        target: newValue
      }
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.lastChargedField = {
        field: {
          ...this.tableData[fieldIndex],
          value: newValue
        },
        index: fieldIndex
      };
      this.updateField.emit(this.lastChargedField);
    });

  }
  editValue(fieldIndex: number): void {
    const editDialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: { item: this.tableData[fieldIndex] }
    });

    editDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe((newValue: string) => {
      this.confirmEditValue(fieldIndex, newValue);
    });
  }
}
