import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {UploadProjectComponent} from './projects/upload-project/upload-project.component';
import {ProjectsComponent} from './projects/projects.component';

import {DropdownDirective} from './shared/dropdown.directive';
import {ProjectsDetailComponent} from './projects/projects-detail/projects-detail.component';
import {ProjectsListComponent} from './projects/projects-list/projects-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select';
import {CreateRelationComponent} from './create-relation/create-relation.component';
import {MatButtonModule} from '@angular/material/button';
import {ProjectCharacterizationComponent} from './project-characterization/project-characterization.component';
import {MatInputModule} from '@angular/material/input';
import {ProjectsService} from './projects/projects.service';
import {ViewComponentQualityAspectComponent} from './projects/view-component-quality-aspect/view-component-quality-aspect';
import {MatTableModule} from '@angular/material/table';
import {UploadComponentComponent} from './components/upload-component/upload-component.component';
import {ComponentsComponent} from './components/components.component';
import {ComponentsListComponent} from './components/components-list/components-list.component';
import {ComponentsDetailComponent} from './components/components-detail/components-detail.component';
import {ComponentsService} from './components/components.service';
import {MatListModule} from '@angular/material/list';
import {ViewComponentQualityIndicatorComponent} from './projects/view-component-quality-indicator/view-component-quality-indicator';
import {CreateQualityModelComponent} from './create-quality-model/create-quality-model.component';
import {MatIconModule} from '@angular/material/icon';
import {ViewQualityModelComponent} from './view-quality-model/view-quality-model.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadProjectComponent,
    ProjectsComponent,
    DropdownDirective,
    ProjectsDetailComponent,
    ProjectsListComponent,
    CreateRelationComponent,
    ProjectCharacterizationComponent,
    ViewComponentQualityAspectComponent,
    ViewComponentQualityIndicatorComponent,
    UploadComponentComponent,
    ComponentsComponent,
    ComponentsListComponent,
    ComponentsDetailComponent,
    CreateQualityModelComponent,
    ViewQualityModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatIconModule
  ],
  providers: [ProjectsService, ComponentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
