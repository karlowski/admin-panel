import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsChildComponent } from './validations-child.component';

describe('ValidationsChildComponent', () => {
  let component: ValidationsChildComponent;
  let fixture: ComponentFixture<ValidationsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
