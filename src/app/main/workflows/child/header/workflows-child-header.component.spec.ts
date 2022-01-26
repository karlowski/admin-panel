import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsChildHeaderComponent } from './workflows-child-header.component';

describe('WorkflowsChildHeaderComponent', () => {
  let component: WorkflowsChildHeaderComponent;
  let fixture: ComponentFixture<WorkflowsChildHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsChildHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsChildHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
