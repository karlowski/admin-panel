import { Component, Input } from '@angular/core';

import { WorkflowsState } from '../../models/workflow/workflows.constants';

@Component({
  selector: 'app-workflows-state',
  templateUrl: './workflows-state.component.html',
  styleUrls: ['./workflows-state.component.scss']
})
export class WorkflowsStateComponent {
  @Input() state: string;
  workflowsState = WorkflowsState;
}
