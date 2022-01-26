import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsMasterContentComponent } from './validations-master-content.component';

describe('ValidationsTableComponent', () => {
  let component: ValidationsMasterContentComponent;
  let fixture: ComponentFixture<ValidationsMasterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsMasterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsMasterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
