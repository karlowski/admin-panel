import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingChildHeaderComponent } from './travelling-child-header.component';

describe('TravellingChildHeaderComponent', () => {
  let component: TravellingChildHeaderComponent;
  let fixture: ComponentFixture<TravellingChildHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingChildHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingChildHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
