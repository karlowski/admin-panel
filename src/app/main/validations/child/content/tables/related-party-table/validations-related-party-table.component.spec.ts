import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationsRelatedPartyTableComponent } from './validations-related-party-table.component';

describe('ValidationsRelatedPartyTableComponent', () => {
  let component: ValidationsRelatedPartyTableComponent;
  let fixture: ComponentFixture<ValidationsRelatedPartyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationsRelatedPartyTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsRelatedPartyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
