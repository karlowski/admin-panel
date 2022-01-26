import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { IValidationsChildNgRxState } from '../../../store/validations-child.reducer';
import { selectDocumentUrls } from '../../../store/validations-child.selectors';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Unsubscriber } from '../../../../../../shared/unsubscriber.class';
import { purchaseDocument } from '../../../store/validations-child.actions';

@Component({
  selector: 'app-validations-catalog-table',
  templateUrl: './validations-catalog-table.component.html',
  styleUrls: ['./validations-catalog-table.component.scss']
})
export class CatalogTableComponent extends Unsubscriber implements OnInit {
  @Input() tableData: any[];

  columnsHeaders = ['name', 'date', 'type', 'currency', 'price', 'document'];
  isDocumentLoading: boolean[] = [];
  documentsUrls;

  constructor(
    private store: Store<IValidationsChildNgRxState>,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.select(selectDocumentUrls).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((urls) => {
      this.isDocumentLoading.fill(false);
      this.documentsUrls = urls;
    });

    this.tableData?.forEach(() => this.isDocumentLoading.push(false));
  }

  purchaseDocument(document: any, index: number): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Purchase document',
        title: 'Are you sure you want to purchase document:',
        item: document.name,
        button: `Purchase (${document.price} ${document.currency})`
      }
    }).afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed)),
      tap(() => this.isDocumentLoading[index] = true),
    ).subscribe(() => {
      this.store.dispatch(purchaseDocument({ documentId: document.documentId }));
    });
  }
}
