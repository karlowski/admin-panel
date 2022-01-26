import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineLabelsChartComponent } from './inline-labels-chart.component';

describe('InlineLabelsChartComponent', () => {
  let component: InlineLabelsChartComponent;
  let fixture: ComponentFixture<InlineLabelsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineLabelsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineLabelsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
