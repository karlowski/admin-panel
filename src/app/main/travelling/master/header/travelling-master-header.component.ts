import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { IStat } from 'src/app/shared/models/stat.interface';
import { Unsubscriber } from 'src/app/shared/unsubscriber.class';
import { loadDateStats } from '../../store/travelling.actions';
import { ITravellingNgRxState } from '../../store/travelling.reducer';
import { selectTravellingDates } from '../../store/travelling.selectors';

@Component({
  selector: 'app-travelling-master-header',
  templateUrl: './travelling-master-header.component.html',
  styleUrls: ['./travelling-master-header.component.scss']
})
export class TravellingMasterHeaderComponent extends Unsubscriber {
  dateIntervals: IStat[];

  constructor(
    private store: Store<ITravellingNgRxState>) {
    super();
    this.store.dispatch(loadDateStats());
    this.store.select(selectTravellingDates).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((stats) => this.dateIntervals = stats?.dateIntervals);
  }
}
