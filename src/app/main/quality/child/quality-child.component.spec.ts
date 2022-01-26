import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityChildComponent } from './quality-child.component';

describe('QualityChildComponent', () => {
  let component: QualityChildComponent;
  let fixture: ComponentFixture<QualityChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
