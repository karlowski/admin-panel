import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLimitDialogComponent } from './add-new-limit-dialog.component';

describe('AddNewLimitDialogComponent', () => {
  let component: AddNewLimitDialogComponent;
  let fixture: ComponentFixture<AddNewLimitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewLimitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
