import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsChildContentComponent } from './validations-child-content.component';

describe('ValidationsChildContentComponent', () => {
  let component: ValidationsChildContentComponent;
  let fixture: ComponentFixture<ValidationsChildContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsChildContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsChildContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
