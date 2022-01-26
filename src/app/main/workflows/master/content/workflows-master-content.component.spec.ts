import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsMasterContentComponent } from './workflows-master-content.component';

describe('WorkflowsMasterContentComponent', () => {
  let component: WorkflowsMasterContentComponent;
  let fixture: ComponentFixture<WorkflowsMasterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsMasterContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsMasterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
