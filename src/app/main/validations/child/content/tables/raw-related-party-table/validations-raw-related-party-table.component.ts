import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LabelingRawField, RelatedPartyUI, LabelingRelatedPartyPair } from 'src/app/shared/models/validation/labeling/field';
import { toCapitalizedWords } from 'src/app/shared/models/util/text.util';
import { IValidationFieldChange } from 'src/app/shared/models/validation/validation-field-change';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { IValidationsChildNgRxState } from '../../../store/validations-child.reducer';
import { selectSaveField } from '../../../store/validations-child.selectors';
import { RawRelatedPartyDialogComponent } from '../../dialogs/raw-related-party-dialog/raw-related-party-dialog.component';

@Component({
  selector: 'app-validations-raw-related-party-table',
  templateUrl: './validations-raw-related-party-table.component.html',
  styleUrls: ['./validations-raw-related-party-table.component.scss']
})
export class ValidationsRawRelatedPartyTableComponent extends Unsubscriber implements OnInit {

  @Input() tableData: LabelingRawField[][];
  @Input() fieldName: string;
  @Output() updateField: EventEmitter<IValidationFieldChange> = new EventEmitter<IValidationFieldChange>();

  flatTableData: RelatedPartyUI[] = [];
  columnsHeaders = ['flag', 'flagType', 'value'];
  lastChargedField: IValidationFieldChange = null;
  constructor(
    private dialog: MatDialog,
    private store: Store<IValidationsChildNgRxState>,
  ){
    super();
    this.store.select(selectSaveField).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(() => {
      if (!this.lastChargedField){
        return;
      }
      if (this.lastChargedField.index === -1){
        this.tableData = [...this.tableData, this.lastChargedField.field];
      }else{
        this.tableData[this.lastChargedField.index] = this.lastChargedField.field;
      }
      this.flatTableData = this.tableData.map(this.flattenRelatedParties);
      this.flatTableData[this.lastChargedField.index === -1 ? this.flatTableData.length - 1 : this.lastChargedField.index].modified = true;
      this.lastChargedField = null;
    });
  }

  ngOnInit(): void {
    this.flatTableData = this.tableData?.map(this.flattenRelatedParties);
  }

  flattenRelatedParties(relatedPartyAttributes: LabelingRawField[]): RelatedPartyUI {
    return ({
        values: relatedPartyAttributes?.map(attribute => ({
          name: attribute.name,
          value: attribute.value,
        })),
        flag: relatedPartyAttributes.find(attribute => attribute.flag)?.flag,
        modified: relatedPartyAttributes[0]?.modified
    });
  }

  toCapitalizedWords(): string {
    return toCapitalizedWords(this.fieldName);
  }

  createField(): void {
    const addFieldDialogRef = this.dialog.open(RawRelatedPartyDialogComponent, {
      width: '1000px',
      data: { fields: [], newParty: true }
    });

    addFieldDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe((newParty: RelatedPartyUI[]) => {
      this.lastChargedField = {
        field: newParty,
        index: -1,
      };
      this.updateField.emit(this.lastChargedField);
    });
  }

  confirmEditValue(fieldIndex: number, newFields: LabelingRelatedPartyPair[]): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'change related party',
        title: 'Are you sure you want to change the related party?'
      }
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      this.lastChargedField = {
        field: newFields,
        index: fieldIndex
      };
      this.updateField.emit(this.lastChargedField);
    });
  }

  editValue(fieldIndex: number): void {
    const editDialogRef = this.dialog.open(RawRelatedPartyDialogComponent, {
      width: '1000px',
      data: { fields: this.tableData[fieldIndex], newParty: false}
    });

    editDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe((newParty: LabelingRelatedPartyPair[]) => this.confirmEditValue(fieldIndex, newParty));
  }
}
