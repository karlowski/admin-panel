import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsChildContentComponent } from './workflows-child-content.component';

describe('WorkflowsChildContentComponent', () => {
  let component: WorkflowsChildContentComponent;
  let fixture: ComponentFixture<WorkflowsChildContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsChildContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsChildContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
