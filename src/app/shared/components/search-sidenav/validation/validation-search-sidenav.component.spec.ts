import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationSearchSidenavComponent } from './validation-search-sidenav.component';


describe('ValidationSearchSidenavComponent', () => {
  let component: ValidationSearchSidenavComponent;
  let fixture: ComponentFixture<ValidationSearchSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationSearchSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSearchSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
