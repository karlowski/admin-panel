import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDrawer } from '@angular/material/sidenav';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';

import { Unsubscriber } from '../../../unsubscriber.class';
import { ITravellingNgRxState } from '../../../../main/travelling/store/travelling.reducer';
import { IPagination } from '../../../models/pagination.interface';
import { DUMMY_NAMES } from '../../../models/dummy';
import { ISearchQuery } from '../../../models/search-query.interface';
import { selectPagination } from '../../../../main/travelling/store/travelling.selectors';
import { loadDummyQuery } from '../../../../main/travelling/store/travelling.actions';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';

@Component({
  selector: 'app-travelling-search-sidenav',
  templateUrl: './travelling-search-sidenav.component.html',
  styleUrls: ['./travelling-search-sidenav.component.scss']
})
export class TravellingSearchSidenavComponent extends Unsubscriber implements OnInit {
  @Input() drawer: MatDrawer;
  pagination: IPagination;
  form = new FormGroup({
    dummy: new FormControl()
  });
  states = [];

  constructor(
    private store: Store<ITravellingNgRxState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlFilterService: UrlFilterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.select(selectPagination).pipe(
      takeUntil(this.unsubscribe),
      filter((workflowQuery => Boolean(workflowQuery)))
    ).subscribe((pagination) => this.pagination = pagination);
  }

  onSubmit(): void {
    const searchQuery: ISearchQuery = {
      ...this.form.getRawValue()
    };
    for (const prop in searchQuery) {
      if (!searchQuery[prop]) {
        delete searchQuery[prop];
      }
    }
    this.urlFilterService.filterSubject.next(searchQuery);
    this.router.navigate([searchQuery], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.store.dispatch(loadDummyQuery({ pagination: this.pagination, searchQuery }));
  }

  onRefresh(): void {
    this.form.reset();
  }

  getDummys(): string[]{
    return Object.keys(DUMMY_NAMES);
  }

  getDummyName(code): string{
    return DUMMY_NAMES[code.toLowerCase()];
  }
}
