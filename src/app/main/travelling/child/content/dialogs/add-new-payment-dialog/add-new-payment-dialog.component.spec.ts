import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPaymentDialogComponent } from './add-new-payment-dialog.component';

describe('AddNewPaymentDialogComponent', () => {
  let component: AddNewPaymentDialogComponent;
  let fixture: ComponentFixture<AddNewPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
