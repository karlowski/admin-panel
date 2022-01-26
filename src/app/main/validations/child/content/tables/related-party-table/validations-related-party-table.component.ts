import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { getFullName, toCapitalizedWords } from 'src/app/shared/models/util/text.util';
import { IValidationFieldChange } from 'src/app/shared/models/validation/validation-field-change';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import {
  LabelingRelatedParty,
  LabelingRelatedPartyPair,
  RelatedPartyAttributes,
  RelatedPartyUI,
  LabelingRawField
} from 'src/app/shared/models/validation/labeling/field';
import { Store } from '@ngrx/store';
import { IValidationsChildNgRxState } from '../../../store/validations-child.reducer';
import { selectSaveField } from '../../../store/validations-child.selectors';
import { RelatedPartyDialogComponent } from '../../dialogs/related-party-dialog/related-party-dialog.component';
import { RELATED_PARTY_TYPES_MAPPED_DATA } from 'src/app/shared/models/appConstants';

@Component({
  selector: 'app-validations-related-party-table',
  templateUrl: './validations-related-party-table.component.html',
  styleUrls: ['./validations-related-party-table.component.scss']
})
export class ValidationsRelatedPartyTableComponent extends Unsubscriber implements OnInit{

  @Input() tableData: LabelingRelatedParty [];
  @Input() fieldName: string;
  @Output() updateField: EventEmitter<IValidationFieldChange> = new EventEmitter<IValidationFieldChange>();

  flatTableData: RelatedPartyUI[] = [];
  columnsHeaders = ['flag', 'flagType', 'name', 'role', 'value'];
  lastChargedField: IValidationFieldChange = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<IValidationsChildNgRxState>
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
        this.tableData = [...this.tableData, this.lastChargedField.field];
      }else{
        this.tableData[this.lastChargedField.index] = this.lastChargedField.field;
      }
      this.flatTableData = this.tableData.map(relatedParty => this.flattenRelatedParties(relatedParty));
      this.flatTableData[this.lastChargedField.index === -1 ? this.flatTableData.length - 1 : this.lastChargedField.index].modified = true;
      this.lastChargedField = null;
      this.lastChargedField = null;
    });

    this.flatTableData = this.tableData?.map(relatedParty => this.flattenRelatedParties(relatedParty));
  }

  flattenRelatedParties(relatedParty: LabelingRelatedParty): RelatedPartyUI {
    const firstName = this.getAttributeValue(relatedParty, RelatedPartyAttributes.firstName);
    const lastName = this.getAttributeValue(relatedParty, RelatedPartyAttributes.lastName);
    const registeredName = this.getAttributeValue(relatedParty, RelatedPartyAttributes.registeredName);
    const role = this.getAttributeValue(relatedParty, RelatedPartyAttributes.role);
    const name = relatedParty.objectType === RELATED_PARTY_TYPES_MAPPED_DATA.naturalPerson
        ? getFullName(firstName, lastName)
        : registeredName;
    const nonNameFields = relatedParty?.data?.filter(this.filterNameFields);
    const values = nonNameFields?.map(field => ({
        name: field.name,
        value: field.value
    }));

    return {
        values,
        name,
        role,
        type: relatedParty.objectType,
        flag: relatedParty.data?.find(field => field.flag)?.flag
    };
  }

  filterNameFields(field: LabelingRawField): boolean {
    return [  RelatedPartyAttributes.firstName,
              RelatedPartyAttributes.lastName,
              RelatedPartyAttributes.registeredName,
              RelatedPartyAttributes.role,
              ''].indexOf(field?.name) < 0;
  }
  getAttributeValue(relatedParty: LabelingRelatedParty, key: string): string {
    return relatedParty?.data?.find(field => field.name === key)?.value;
  }

  toCapitalizedWords(): string {
    return toCapitalizedWords(this.fieldName);
  }

  createField(): void {
    const addFieldDialogRef = this.dialog.open(RelatedPartyDialogComponent, {
      width: '600px',
      data: { newParty: true }
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
    const editDialogRef = this.dialog.open(RelatedPartyDialogComponent, {
      width: '600px',
      data: { item: this.tableData[fieldIndex]}
    });

    editDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe((newParty: LabelingRelatedPartyPair[]) => this.confirmEditValue(fieldIndex, newParty));
  }
}
