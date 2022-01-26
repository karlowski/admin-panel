import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsMasterComponent } from './workflows-master.component';

describe('WorkflowsMasterComponent', () => {
  let component: WorkflowsMasterComponent;
  let fixture: ComponentFixture<WorkflowsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
