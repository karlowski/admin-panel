import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMasterHeaderComponent } from './quality-master-header.component';

describe('QualityMasterHeaderComponent', () => {
  let component: QualityMasterHeaderComponent;
  let fixture: ComponentFixture<QualityMasterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMasterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityMasterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
