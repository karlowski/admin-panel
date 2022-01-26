import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationsDocumentTableComponent } from './validations-document-table.component';

describe('ValidationsDocumentTableComponent', () => {
  let component: ValidationsDocumentTableComponent;
  let fixture: ComponentFixture<ValidationsDocumentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsDocumentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsDocumentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
