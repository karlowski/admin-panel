import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatIfDateType } from 'src/app/shared/models/util/text.util';
import { LabelingRawField, RelatedPartyAttributes } from 'src/app/shared/models/validation/labeling/field';
import {
  CONTROL_TYPES,
  RELATED_PARTY_TYPES,
  RELATED_PARTY_TYPES_OPTIONS
} from '../../../../../../shared/models/appConstants';

@Component({
  selector: 'app-related-party-dialog',
  templateUrl: './related-party-dialog.component.html',
  styleUrls: ['./related-party-dialog.component.scss']
})
export class RelatedPartyDialogComponent {
  form: FormGroup;
  newParty: boolean;
  controlTypes = CONTROL_TYPES;
  relatedPartyTypes = RELATED_PARTY_TYPES_OPTIONS;
  relatedPartyType: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<string>
  ) {
    this.newParty = data.newParty;
    const relatedParty = data.item;
    const rpData: LabelingRawField[] = relatedParty?.data;

    // TODO include all other ~200 fields dynamically
    this.form = new FormGroup({
      relatedPartyType: new FormControl(
        relatedParty?.objectType
          ? this.relatedPartyTypes.find(type => type.id === relatedParty.objectType)?.name
          : null
      ),
      ownershipPercentage: new FormControl(relatedParty?.ownerShipPercentage),
    });

    Object.keys(RelatedPartyAttributes).forEach(attribute => this.form.addControl(attribute, new FormControl(
      rpData?.find(field => field.name === RelatedPartyAttributes[attribute])?.value
    )));
  }

  save(): void {
    this.dialogRef.close({
      objectType: this.form.controls.relatedPartyType.value,
      ownerShipPercentage: this.form.controls.ownershipPercentage.value,
      data: Object.keys(RelatedPartyAttributes).map(attribute => ({
        name: RelatedPartyAttributes[attribute],
        value: formatIfDateType(this.form.controls[attribute].value)
      })).filter(field => field.value),
    });
  }

  isFireWorks(): boolean {
    return this.form.controls.relatedPartyType.value === RELATED_PARTY_TYPES.fireWorks;
  }
}
