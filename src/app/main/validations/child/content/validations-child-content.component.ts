import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { selectValidation } from '../store/validations-child.selectors';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IValidationsChildNgRxState  } from '../store/validations-child.reducer';
import { toCapitalizedWords } from 'src/app/shared/models/util/text.util';
import { IValidationLabeling } from 'src/app/shared/models/validation/validation-labeling.interface';
import { IValidationFieldChange } from 'src/app/shared/models/validation/validation-field-change';
import { saveField, updateField } from '../store/validations-child.actions';
import { IPatchOperation } from 'src/app/shared/models/validation/patch-operation.interface';
import { ILabelingRawData } from 'src/app/shared/models/validation/labeling/raw-data';
import { LabelingMappedData } from 'src/app/shared/models/validation/labeling/mapped-data';

@Component({
  selector: 'app-validations-child-content',
  templateUrl: './validations-child-content.component.html',
  styleUrls: ['./validations-child-content.component.scss']
})
export class ValidationsChildContentComponent extends Unsubscriber {
  rawFieldTypes = ['basic', 'extended', 'relatedParty', 'filing', 'documentCatalog'];
  mappedFieldTypes = ['data', 'documents', 'relatedParties'];
  columnsHeaders = ['flag', 'flagType', 'name', 'fieldType', 'value'];

  validationId = this.activatedRoute.snapshot.paramMap.get('id');
  rawData: Partial<ILabelingRawData> = null;
  mappedData: Partial<LabelingMappedData> = null;
  labeling: IValidationLabeling = null;
  constructor(
    private store: Store<IValidationsChildNgRxState>,
    private activatedRoute: ActivatedRoute
    ) {
    super();

    this.store.select(selectValidation).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((validation) => {
      this.labeling = validation;
      this.rawData = {};
      this.rawFieldTypes.forEach(rawFieldType => {
        this.rawData[rawFieldType] = validation?.raw?.data?.[rawFieldType];
      });
      this.mappedData = {
        data: validation?.payload?.entity?.fields,
        documents: validation?.payload?.entity?.documents,
        relatedParties: validation?.payload?.relatedparties,
      };
    });
  }

  toCapitalizedWords(name): string {
    return toCapitalizedWords(name);
  }

  getFlagCount(fieldType: string): number {
    const flagCount = this.mappedData[fieldType]?.filter(field => field.flag).length;
    return flagCount > 0 ? flagCount : null;
  }

  updateField(fieldChange: IValidationFieldChange, basePath: string): void {
    const isNewField = fieldChange.index === -1;
    const changeWholeObject = isNewField
      || basePath.startsWith('/raw/data/relatedParty')
      || basePath.startsWith('/payload/relatedParties');
    const patchOperation: IPatchOperation = {
      op:  isNewField ? 'add' : 'replace',
      path: basePath
        + (isNewField ? '/-' : `/${fieldChange.index}`)
        + (changeWholeObject ? '' : '/value'),
      value: isNewField ? fieldChange.field : fieldChange.field.value
    };
    isNewField ? this.store.dispatch(saveField({
      labelingId: this.labeling._iBrumaId,
      patchOperation,
      validationId: this.validationId
    })) : this.store.dispatch(updateField({
      labelingId: this.labeling._iBrumaId,
      patchOperation,
    }))
  }
}
