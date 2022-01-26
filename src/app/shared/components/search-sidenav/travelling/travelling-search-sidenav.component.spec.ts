import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingSearchSidenavComponent } from './travelling-search-sidenav.component';

describe('TravellingSearchSidenavComponent', () => {
  let component: TravellingSearchSidenavComponent;
  let fixture: ComponentFixture<TravellingSearchSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingSearchSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingSearchSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
