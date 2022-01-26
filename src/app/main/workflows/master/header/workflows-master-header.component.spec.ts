import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsMasterHeaderComponent } from './workflows-master-header.component';

describe('WorkflowsHeaderComponent', () => {
  let component: WorkflowsMasterHeaderComponent;
  let fixture: ComponentFixture<WorkflowsMasterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsMasterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsMasterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
