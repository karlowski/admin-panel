import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsMasterComponent } from './validations-master.component';

describe('ValidationsMasterComponent', () => {
  let component: ValidationsMasterComponent;
  let fixture: ComponentFixture<ValidationsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
