import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsFieldTableComponent } from './validations-field-table.component';

describe('ValidationsFieldTableComponent', () => {
  let component: ValidationsFieldTableComponent;
  let fixture: ComponentFixture<ValidationsFieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsFieldTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsFieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
