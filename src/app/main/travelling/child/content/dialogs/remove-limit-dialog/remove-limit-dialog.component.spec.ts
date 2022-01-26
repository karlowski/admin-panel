import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLimitDialogComponent } from './remove-limit-dialog.component';

describe('RemoveLimitDialogComponent', () => {
  let component: RemoveLimitDialogComponent;
  let fixture: ComponentFixture<RemoveLimitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveLimitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
