import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IQualityTableRow } from '../../../../shared/models/quality/quality-table.interface';
import { IQualityNgRxState } from '../store/quality.reducer';
import { selectQualityTableData } from '../store/quality.selectors';
import { Router } from '@angular/router';
import { DUMMY_NAMES } from 'src/app/shared/models/dummy';

@Component({
  selector: 'app-quality-master-content',
  templateUrl: './quality-master-content.component.html',
  styleUrls: ['./quality-master-content.component.scss']
})
export class QualityMasterContentComponent extends Unsubscriber {
  columnsHeaders = [
    'dummy', 'averageBasic', 'averageExtended', 'averageFiling', 'averageData', 'averageMLScore', 'averageMLPrecision'];

  tableData$ = this.store.select(selectQualityTableData);

  constructor(
    private store: Store<IQualityNgRxState>,
    private router: Router ) {
    super();
  }

  navigateToQualityChild(tableRow: IQualityTableRow): void {
    this.router.navigate(['quality', tableRow.dummyCode]);
  }

  getDummyName(dummyCode: string): string {
    return DUMMY_NAMES[dummyCode];
  }
}
