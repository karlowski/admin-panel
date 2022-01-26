import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsChildComponent } from './workflows-child.component';

describe('WorkflowsChildComponent', () => {
  let component: WorkflowsChildComponent;
  let fixture: ComponentFixture<WorkflowsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
