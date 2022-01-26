import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'workflow',
    loadChildren: () => import('./workflows/workflows.module').then(w => w.WorkflowsModule)
  },
  {
    path: 'quality',
    loadChildren: () => import('./quality/quality.module').then(q => q.QualityModule)
  },
  {
    path: 'validation',
    loadChildren: () => import('./validations/validations.module').then(w => w.ValidationsModule)
  },
  {
    path: 'travelling',
    loadChildren: () => import('./travelling/travelling.module').then(w => w.TravellingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
