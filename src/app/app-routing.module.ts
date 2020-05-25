import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadProjectComponent} from './projects/upload-project/upload-project.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectsDetailComponent} from './projects/projects-detail/projects-detail.component';
import {CreateRelationComponent} from './create-relation/create-relation.component';
import {ProjectCharacterizationComponent} from './project-characterization/project-characterization.component';
import {ViewComponentQualityAspectComponent} from './projects/view-component-quality-aspect/view-component-quality-aspect';
import {ComponentsComponent} from './components/components.component';
import {UploadComponentComponent} from './components/upload-component/upload-component.component';
import {ComponentsDetailComponent} from './components/components-detail/components-detail.component';
import {ViewComponentQualityIndicatorComponent} from './projects/view-component-quality-indicator/view-component-quality-indicator';
import {CreateQualityModelComponent} from './create-quality-model/create-quality-model.component';


const routes: Routes = [

  // {path: 'createRelation', component: CreateRelationComponent},
  {path: 'createQualityModel', component: CreateQualityModelComponent},

  {
    path: 'projects', component: ProjectsComponent, children: [
      {path: 'upload', component: UploadProjectComponent},
      {path: ':id', component: ProjectsDetailComponent},
      // {path: ':id/:id2/viewComponentQualityAspect', component: ViewComponentQualityAspectComponent},
      // {path: ':id/viewComponentQualityIndicator', component: ViewComponentQualityIndicatorComponent},
      // {path: ':id/projectCharacterization', redirectTo: '/projectCharacterization'},
    ]
  },

  {
    path: 'components', component: ComponentsComponent, children: [
      {path: 'uploadComponents', component: UploadComponentComponent},
      {path: ':id', component: ComponentsDetailComponent},
      // {path: ':id/projectCharacterization', redirectTo: '/projectCharacterization'},
    ]
  },

  // {path: 'projectCharacterization', component: ProjectCharacterizationComponent},
  // {path: 'viewComponentQualityAspect', component: ViewComponentQualityAspectComponent},
  // {path: 'viewComponentQualityIndicator', component: ViewComponentQualityIndicatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
