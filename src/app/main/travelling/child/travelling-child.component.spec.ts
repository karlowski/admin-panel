import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingChildComponent } from './travelling-child.component';

describe('TravellingChildComponent', () => {
  let component: TravellingChildComponent;
  let fixture: ComponentFixture<TravellingChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
