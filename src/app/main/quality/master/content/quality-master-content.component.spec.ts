import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMasterContentComponent } from './quality-master-content.component';

describe('QualityMasterContentComponent', () => {
  let component: QualityMasterContentComponent;
  let fixture: ComponentFixture<QualityMasterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMasterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityMasterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
