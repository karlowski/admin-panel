import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkflowsComponent } from './workflows.component';
import { WorkflowsMasterContentComponent } from './master/content/workflows-master-content.component';
import { WorkflowsMasterHeaderComponent } from './master/header/workflows-master-header.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkflowsChildComponent } from './child/workflows-child.component';
import { WorkflowsMasterComponent } from './master/workflows-master.component';
import { WorkflowsChildContentComponent } from './child/content/workflows-child-content.component';
import { WorkflowsChildHeaderComponent } from './child/header/workflows-child-header.component';


@NgModule({
  declarations: [
    WorkflowsComponent,
    WorkflowsMasterContentComponent,
    WorkflowsMasterHeaderComponent,
    WorkflowsChildComponent,
    WorkflowsMasterComponent,
    WorkflowsChildContentComponent,
    WorkflowsChildHeaderComponent
  ],
  exports: [
    WorkflowsComponent
  ],
  imports: [
      CommonModule,
      RouterModule.forChild([
          {
              path: '',
              component: WorkflowsMasterComponent
          },
          {
              path: 'child',
              component: WorkflowsChildComponent
          }
      ]),
      SharedModule,
      ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class WorkflowsModule { }
