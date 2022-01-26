import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';


import { IWorkflowsNgRxState } from '../../store/workflows.reducer';
import {
  selectPagination, selectWorkflowTableData,
} from '../../store/workflows.selectors';
import { loadWorkflowQuery } from '../../store/workflows.actions';
import { IWorkflowTableRow } from '../../../../shared/models/workflow/workflows-table.interface';
import { Unsubscriber } from '../../../../shared/unsubscriber.class';
import { IPagination } from '../../../../shared/models/pagination.interface';
import { UrlFilterService } from 'src/app/shared/services/urlFilterService';
import { FILTER_NAMES } from 'src/app/shared/models/appConstants';


@Component({
  selector: 'app-workflows-master-content',
  templateUrl: './workflows-master-content.component.html',
  styleUrls: ['./workflows-master-content.component.scss']
})
export class WorkflowsMasterContentComponent extends Unsubscriber {
  columnsHeaders = ['workflow', 'dummy', 'childWorkflows', 'state', 'createdBy', 'createdAt', 'lastUpdated', 'status'];

  pagination: IPagination;
  tableData$ = this.store.select(selectWorkflowTableData);
  pagination$: Observable<IPagination> = this.store.select(selectPagination);
  activeFilters: [string, unknown][] = [];

  constructor(
    private store: Store<IWorkflowsNgRxState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private urlFilterService: UrlFilterService,
    private datePipe: DatePipe
    ) {
    super();
    this.store.dispatch(loadWorkflowQuery({}));
    this.urlFilterService.filterSubject.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(filters => {
      this.activeFilters = Object.entries(filters ?? {}).filter(entry => entry[1]);
    });

    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => {
      this.pagination = pagination;
    });
  }

  changePageNumber(updatedPageNumber: number): void {
    this.store.dispatch(loadWorkflowQuery({ pagination:  { ...this.pagination, page: updatedPageNumber } }));
  }

  changePageSize(updatedPageSize): void {
    this.store.dispatch(loadWorkflowQuery({ pagination:  { ...this.pagination, size: updatedPageSize, page: 0 } }));
  }

  navigateToWorkflowChild(tableRow: IWorkflowTableRow): void {
    this.router.navigate(['./child'], { relativeTo: this.activatedRoute, queryParams: { id: tableRow.workflowId } });
  }

  onChipRemove(filterName: string): void {
    this.activeFilters = this.activeFilters.filter(activeFilter => activeFilter[0] !== filterName);
    const searchQuery =  Object.fromEntries(this.activeFilters);
    this.router.navigate([searchQuery], { relativeTo: this.activatedRoute, replaceUrl: true });
    this.urlFilterService.filterSubject.next(searchQuery);
    this.store.dispatch(loadWorkflowQuery({ pagination: this.pagination, searchQuery }));
  }

  getFilterValue(activeFilter: [string, string]): string{
    return this.urlFilterService.getFilterValue(this.datePipe, activeFilter);
  }

  getFilterName(activeFilter: [string, string]): string{
    return FILTER_NAMES[activeFilter[0]];
  }
}
