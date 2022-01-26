import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';


import { ITravellingChildNgRxState } from '../store/travelling-child.reducer';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { selectPaymentSource } from '../store/travelling-child.selectors';
import { takeUntil } from 'rxjs/operators';
import { IDummyPaymentSources } from 'src/app/shared/models/travelling/travelling-table.interface';
import { DUMMY_NAMES } from 'src/app/shared/models/dummy';

@Component({
  selector: 'app-travelling-child-header',
  templateUrl: './travelling-child-header.component.html',
  styleUrls: ['./travelling-child-header.component.scss']
})
export class TravellingChildHeaderComponent extends Unsubscriber {

  paymentSources: IDummyPaymentSources;
  dummyCode: string = this.activatedRoute.snapshot.paramMap.get('dummy');
  dummyName: string = DUMMY_NAMES[this.dummyCode];

  constructor(
    private store: Store<ITravellingChildNgRxState>,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.store.select(selectPaymentSource).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((paymentSources) => this.paymentSources = paymentSources);
  }
}
