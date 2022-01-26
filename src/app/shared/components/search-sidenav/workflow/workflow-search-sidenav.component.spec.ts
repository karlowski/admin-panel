import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkflowSearchSidenavComponent } from './workflow-search-sidenav.component';


describe('WorkflowSearchSidenavComponent', () => {
  let component: WorkflowSearchSidenavComponent;
  let fixture: ComponentFixture<WorkflowSearchSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowSearchSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSearchSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
