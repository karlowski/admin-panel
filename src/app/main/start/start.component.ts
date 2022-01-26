import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Unsubscriber } from '../../shared/unsubscriber.class';
import { IStartNgRxState } from './store/start.reducer';
import * as startActions from './store/start.actions';

import { selectExtractions, selectStartLoading } from './store/start.selectors';
import { ICompany } from './company.interface';
import { loadCompanyList, submitCompany } from './store/start.actions';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DUMMY_ISO_CODES, DUMMY_NAMES } from 'src/app/shared/models/dummy';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent extends Unsubscriber implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
    dummyCode: new FormControl({ value: null, disabled: true }),
    leExternalId: new FormControl({ value: null, disabled: true }),
  });
  extractions$: Observable<ICompany[]> = this.store.select(selectExtractions);
  loading$: Observable<boolean> = this.store.select(selectStartLoading);
  inputValue = true; // TODO backlogged

  constructor(
    private store: Store<IStartNgRxState>,
    private dialog: MatDialog,
    private submitCompanySuccess$: Actions,
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer,
    ) {
    super();

    Object.keys(DUMMY_NAMES).forEach(dummy =>
      this.matIconRegistry.addSvgIcon(
        dummy,
        this.domSanitzer.bypassSecurityTrustResourceUrl(`assets/icons/flags/${dummy}.svg`)
    ));

    this.submitCompanySuccess$.pipe(
      ofType(startActions.submitCompanySuccess),
      takeUntil(this.unsubscribe)
    ).subscribe(() => {
      this.form.reset();
    });
  }

  ngOnInit(): void {
    this.form.controls.name.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(300),
      tap((value => value ? this.enableAllInputs()  : this.disableAllInputs())),
      filter(value => value.length >= 3),
    ).subscribe((value) => {
      this.store.dispatch(loadCompanyList({ searchTerm: value }));
    });
  }

  onSubmit(): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: {
        header: 'Start Workflow',
        title: 'workflow for the following entity will be started:',
        item: this.form.controls.name?.value}
    });

    confirmDialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe),
      filter((isConfirmed) => Boolean(isConfirmed))
    ).subscribe(() => {
      const query = {
        ...this.form.getRawValue()
      };
      for (const prop in query) {
        if (!query[prop]) {
          delete query[prop];
        }
      }
      this.store.dispatch(submitCompany({ startData: query }));
    });

  }

  disableAllInputs(): void {
    this.form.controls.dummyCode.disable();
    this.form.controls.leExternalId.disable();
  }

  enableAllInputs(): void {
    this.form.controls.dummyCode.enable();
    this.form.controls.leExternalId.enable();
  }

  setCompany(company: ICompany): void {
    this.form.controls.dummyCode.patchValue(company.dummyCode);
    this.form.controls.leExternalId.patchValue(company.leExternalId);
    this.form.controls.name.patchValue(company.name);
  }

  getCountryCode(countryCode: string): string {
    return DUMMY_ISO_CODES[countryCode];
  }
}
