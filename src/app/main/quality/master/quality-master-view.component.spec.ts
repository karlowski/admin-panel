import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMasterViewComponent } from './quality-master-view.component';

describe('QualityMasterViewComponent', () => {
  let component: QualityMasterViewComponent;
  let fixture: ComponentFixture<QualityMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMasterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
