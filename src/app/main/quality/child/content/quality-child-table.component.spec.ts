import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityChildTableComponent } from './quality-child-table.component';

describe('QualityChildTableComponent', () => {
  let component: QualityChildTableComponent;
  let fixture: ComponentFixture<QualityChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityChildTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityChildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
