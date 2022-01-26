import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationsRawRelatedPartyTableComponent } from './validations-raw-related-party-table.component';


describe('ValidationsRawRelatedPartyTableComponent', () => {
  let component: ValidationsRawRelatedPartyTableComponent;
  let fixture: ComponentFixture<ValidationsRawRelatedPartyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsRawRelatedPartyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsRawRelatedPartyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
