import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingChildContentComponent } from './travelling-child-content.component';

describe('TravellingChildContentComponent', () => {
  let component: TravellingChildContentComponent;
  let fixture: ComponentFixture<TravellingChildContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingChildContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingChildContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
