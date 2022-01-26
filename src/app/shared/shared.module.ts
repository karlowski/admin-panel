import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchButtonComponent } from './components/search-button/search-button.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { MaterialModule } from './material/material.module';
import { WorkflowsStatusComponent } from './components/workflows-status/workflows-status.component';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import { LeftButtonComponent } from './components/left-button/left-button.component';
import { RightButtonComponent } from './components/right-button/right-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StatBlockComponent } from './components/stat-block/stat-block.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { InlineLabelsChartComponent } from './components/inline-labels-chart/inline-labels-chart.component';
import { WorkflowsStateComponent } from './components/workflows-state/workflows-state.component';
import { SearchSidenavComponent } from './components/search-sidenav/search-sidenav.component';
import { WorkflowSearchSidenavComponent } from './components/search-sidenav/workflow/workflow-search-sidenav.component';
import { ValidationSearchSidenavComponent } from './components/search-sidenav/validation/validation-search-sidenav.component';
import { TravellingSearchSidenavComponent } from './components/search-sidenav/travelling/travelling-search-sidenav.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ProgressSpinnerComponent } from './loading-spinner/progress-spinner.component';



@NgModule({
  declarations: [
    SearchButtonComponent,
    AddButtonComponent,
    DeleteButtonComponent,
    FileDropComponent,
    ActionButtonsComponent,
    MenuButtonComponent,
    WorkflowsStatusComponent,
    WorkflowsStateComponent,
    StatBlockComponent,
    TablePaginatorComponent,
    LeftButtonComponent,
    RightButtonComponent,
    SearchSidenavComponent,
    WorkflowSearchSidenavComponent,
    ValidationSearchSidenavComponent,
    ConfirmDialogComponent,
    ConfirmDialogComponent,
    InlineLabelsChartComponent,
    TravellingSearchSidenavComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
    exports: [
        MaterialModule,
        FormsModule,
        AddButtonComponent,
        DeleteButtonComponent,
        FileDropComponent,
        ActionButtonsComponent,
        MenuButtonComponent,
        SearchButtonComponent,
        WorkflowsStatusComponent,
        WorkflowsStateComponent,
        StatBlockComponent,
        TablePaginatorComponent,
        RightButtonComponent,
        LeftButtonComponent,
        SearchSidenavComponent,
        ConfirmDialogComponent,
        ConfirmDialogComponent,
        InlineLabelsChartComponent,
        ProgressSpinnerComponent
    ]
})
export class SharedModule { }
