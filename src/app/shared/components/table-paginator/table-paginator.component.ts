import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Unsubscriber } from '../../unsubscriber.class';
import { IPagination } from '../../models/pagination.interface';
import { filter, takeUntil } from 'rxjs/operators';
import { AVAILABLE_PAGE_SIZES } from '../../models/appConstants';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent extends Unsubscriber implements OnInit{
  @Input() pagination$: Observable<IPagination>;
  @Input() paginatorName: string;
  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  availablePageSize = AVAILABLE_PAGE_SIZES;
  pageNumbers: number[];
  form = new FormGroup({
    pageNumber: new FormControl(),
    pageSize: new FormControl()
  });

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.pagination$.pipe(
      takeUntil(this.unsubscribe),
      filter((pagination) => Boolean(pagination))
    ).subscribe((pagination) => {
      this.pageNumbers = [...Array(pagination.totalPages).keys()];
      this.form.patchValue({ pageNumber: pagination.page });
    });
  }

  onPageNumberChange($event): void {
    this.pageNumberChange.emit($event.source.value);
  }

  onPageSizeChange(value: number): void {
    this.pageSizeChange.emit(Number(value));
  }
}
