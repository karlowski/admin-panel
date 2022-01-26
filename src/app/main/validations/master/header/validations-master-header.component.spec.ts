import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsMasterHeaderComponent } from './validations-master-header.component';

describe('ValidationsHeaderComponent', () => {
  let component: ValidationsMasterHeaderComponent;
  let fixture: ComponentFixture<ValidationsMasterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsMasterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsMasterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
