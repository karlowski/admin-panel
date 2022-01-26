import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSourceTableComponent } from './payment-source-table.component';


describe('PaymentSourceTableComponent', () => {
  let component: PaymentSourceTableComponent;
  let fixture: ComponentFixture<PaymentSourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSourceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
