import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingTableComponent } from './travelling-table.component';

describe('TravellingTableComponent', () => {
  let component: TravellingTableComponent;
  let fixture: ComponentFixture<TravellingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
