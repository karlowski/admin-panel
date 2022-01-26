import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { MainModule } from './main/main.module';
import { WorkflowsEffects } from './main/workflows/store/workflows.effects';
import { workflowsReducer } from './main/workflows/store/workflows.reducer';
import { workflowsChildReducer } from './main/workflows/child/store/workflows-child.reducer';
import { validationsReducer } from './main/validations/store/validations.reducer';
import { validationsChildReducer } from './main/validations/child/store/validations-child.reducer';
import { startReducer } from './main/start/store/start.reducer';
import { SharedModule } from './shared/shared.module';
import { StartComponent } from './main/start/start.component';
import { StartEffects } from './main/start/store/start.effects';
import { WorkflowsChildEffects } from './main/workflows/child/store/workflows-child.effects';
import { ValidationsEffects } from './main/validations/store/validations.effects';
import { ValidationsChildEffects } from './main/validations/child/store/validations-child.effects';
import { travellingReducer } from './main/travelling/store/travelling.reducer';
import { TravellingEffects } from './main/travelling/store/travelling.effects';
import { TravellingChildEffects } from './main/travelling/child/store/travelling-child.effects';
import { travellingChildReducer } from './main/travelling/child/store/travelling-child.reducer';
import { qualityReducer } from './main/quality/master/store/quality.reducer';
import { qualityChildReducer } from './main/quality/child/store/quality-child.reducer';
import { QualityEffects } from './main/quality/master/store/quality.effects';
import { QualityChildEffects } from './main/quality/child/store/quality-child.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MainModule,
    StoreModule.forRoot({
      workflow: workflowsReducer,
      workflowChild: workflowsChildReducer,
      validation: validationsReducer,
      validationChild: validationsChildReducer,
      start: startReducer,
      quality: qualityReducer,
      qualityChild: qualityChildReducer,
      travelling: travellingReducer,
      travellingChild: travellingChildReducer
    }),
    EffectsModule.forRoot([
      WorkflowsEffects,
      WorkflowsChildEffects,
      StartEffects,
      ValidationsEffects,
      ValidationsChildEffects,
      QualityEffects,
      QualityChildEffects,
      TravellingEffects,
      TravellingChildEffects
    ]),
    StoreDevtoolsModule.instrument({}),
    ReactiveFormsModule,
    MatAutocompleteModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
