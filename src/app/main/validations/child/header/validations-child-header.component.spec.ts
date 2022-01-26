import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsChildHeaderComponent } from './validations-child-header.component';

describe('ValidationsChildHeaderComponent', () => {
  let component: ValidationsChildHeaderComponent;
  let fixture: ComponentFixture<ValidationsChildHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsChildHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsChildHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
