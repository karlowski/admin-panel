import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { QualityMasterViewComponent } from './master/quality-master-view.component';
import { QualityMasterHeaderComponent } from './master/header/quality-master-header.component';
import { QualityMasterContentComponent } from './master/content/quality-master-content.component';
import { QualityChildComponent } from './child/quality-child.component';
import { QualityChildHeaderComponent } from './child/header/quality-child-header.component';
import { QualityChildTableComponent } from './child/content/quality-child-table.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QualityMasterViewComponent,
    QualityMasterHeaderComponent,
    QualityMasterContentComponent,
    QualityChildComponent,
    QualityChildHeaderComponent,
    QualityChildTableComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule.forChild([
            {
                path: '',
                component: QualityMasterViewComponent
            },
            {
                path: ':dummy',
                component: QualityChildComponent
            }
        ]),
        SharedModule,
        ReactiveFormsModule
    ]
})
export class QualityModule { }
