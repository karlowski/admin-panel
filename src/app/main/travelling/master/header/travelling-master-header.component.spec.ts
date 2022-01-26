import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingMasterHeaderComponent } from './travelling-master-header.component';

describe('TravellingMasterHeaderComponent', () => {
  let component: TravellingMasterHeaderComponent;
  let fixture: ComponentFixture<TravellingMasterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingMasterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingMasterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
