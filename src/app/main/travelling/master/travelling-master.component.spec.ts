import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingMasterComponent } from './travelling-master.component';

describe('TravellingMasterComponent', () => {
  let component: TravellingMasterComponent;
  let fixture: ComponentFixture<TravellingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
