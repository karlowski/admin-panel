import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAlertDialogComponent } from './add-new-alert-dialog.component';

describe('AddNewAlertDialogComponent', () => {
  let component: AddNewAlertDialogComponent;
  let fixture: ComponentFixture<AddNewAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
