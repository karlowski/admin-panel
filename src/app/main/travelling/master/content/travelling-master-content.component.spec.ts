import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingMasterContentComponent } from './travelling-master-content.component';

describe('TravellingMasterContentComponent', () => {
  let component: TravellingMasterContentComponent;
  let fixture: ComponentFixture<TravellingMasterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingMasterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingMasterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
