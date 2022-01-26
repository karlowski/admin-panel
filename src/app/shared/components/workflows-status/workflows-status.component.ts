import { Component, Input } from '@angular/core';

import { WorkflowsStatus } from '../../models/workflow/workflows.constants';

@Component({
  selector: 'app-workflows-status',
  templateUrl: './workflows-status.component.html',
  styleUrls: ['./workflows-status.component.scss']
})
export class WorkflowsStatusComponent {
  @Input() status: string;
  @Input() isRunningPlayIcon = false;
  WorkflowsStatus = WorkflowsStatus;
}
