import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityChildHeaderComponent } from './quality-child-header.component';

describe('QualityChildHeaderComponent', () => {
  let component: QualityChildHeaderComponent;
  let fixture: ComponentFixture<QualityChildHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityChildHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityChildHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
