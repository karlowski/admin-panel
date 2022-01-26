import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingLimitsAlertsTableComponent } from './travelling-limits-alerts-table.component';

describe('TravellingLimitsAlertsTableComponent', () => {
  let component: TravellingLimitsAlertsTableComponent;
  let fixture: ComponentFixture<TravellingLimitsAlertsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingLimitsAlertsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingLimitsAlertsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
