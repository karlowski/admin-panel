import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ValidationsMasterContentComponent } from './master/content/validations-master-content.component';
import { ValidationsMasterHeaderComponent } from './master/header/validations-master-header.component';
import { SharedModule } from '../../shared/shared.module';
import { ValidationsChildComponent } from './child/validations-child.component';
import { ValidationsMasterComponent } from './master/validations-master.component';
import { ValidationsChildContentComponent } from './child/content/validations-child-content.component';
import { ValidationsChildHeaderComponent } from './child/header/validations-child-header.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ValidationsDocumentTableComponent } from './child/content/tables/document-table/validations-document-table.component';
import { EditDialogComponent } from './child/content/dialogs/edit-dialog/edit-dialog.component';
import { CreateFieldDialogComponent } from './child/content/dialogs/create-field-dialog/create-field-dialog.component';
import { RelatedPartyDialogComponent } from './child/content/dialogs/related-party-dialog/related-party-dialog.component';
import { ValidationsFieldTableComponent } from './child/content/tables/field-table/validations-field-table.component';
import {
  ValidationsRelatedPartyTableComponent
} from './child/content/tables/related-party-table/validations-related-party-table.component';
import { AddDocumentDialogComponent } from './child/content/dialogs/add-document-dialog/add-document-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ValidationsRawRelatedPartyTableComponent
} from './child/content/tables/raw-related-party-table/validations-raw-related-party-table.component';
import { RawRelatedPartyDialogComponent } from './child/content/dialogs/raw-related-party-dialog/raw-related-party-dialog.component';
import { CatalogTableComponent } from './child/content/tables/catalog-table/validations-catalog-table.component';


@NgModule({
  declarations: [
    ValidationsMasterContentComponent,
    ValidationsMasterHeaderComponent,
    ValidationsChildComponent,
    ValidationsMasterComponent,
    ValidationsChildContentComponent,
    ValidationsChildHeaderComponent,
    ValidationsFieldTableComponent,
    ValidationsDocumentTableComponent,
    EditDialogComponent,
    CreateFieldDialogComponent,
    ValidationsRelatedPartyTableComponent,
    ValidationsRawRelatedPartyTableComponent,
    RelatedPartyDialogComponent,
    AddDocumentDialogComponent,
    RawRelatedPartyDialogComponent,
    CatalogTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValidationsMasterComponent
      },
      {
        path: ':id',
        component: ValidationsChildComponent
      }
    ]),
    SharedModule,
    MatBadgeModule
  ],
  providers: [
    DatePipe
  ]
})
export class ValidationsModule { }
