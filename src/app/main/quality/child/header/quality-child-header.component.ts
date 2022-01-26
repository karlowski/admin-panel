import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DUMMY_NAMES } from 'src/app/shared/models/dummy';

import { Unsubscriber } from '../../../../shared/unsubscriber.class';

@Component({
  selector: 'app-quality-child-header',
  templateUrl: './quality-child-header.component.html',
  styleUrls: ['./quality-child-header.component.scss']
})
export class QualityChildHeaderComponent extends Unsubscriber {
  dummyCode: string = this.activatedRoute.snapshot.paramMap.get('dummy');
  dummyName: string = DUMMY_NAMES[this.dummyCode];

  constructor( private activatedRoute: ActivatedRoute ) {
    super();
  }
}
