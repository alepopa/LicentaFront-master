import {Component, OnInit} from '@angular/core';
import {Project} from '../projects.model';
import {ProjectsService} from '../projects.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProjectsComponent} from '../components.model';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css']
})
export class ProjectsDetailComponent implements OnInit {
  project: Project;
  component: ProjectsComponent;
  projectId: string;
  file: FileList;
  message: string;
  componentSchemasName: string;
  componentNames: string[];
  selectedComponent: string;
  tableViewQA: any;
  tableViewQABool = false;
  tableViewQI: any;
  tableViewQIBool = false;
  allProjectIds: string[];
  qualityAspects: string[];
  selectedAspect: string;

  constructor(private projectService: ProjectsService,
              private route: ActivatedRoute, private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.id),
      flatMap(id => this.projectService.getProjectById(id)))
      .subscribe((project: Project) => this.project = project);
    this.projectService.getProjects().subscribe(projects => this.allProjectIds = projects.map(p => p.projectId));
  }

  getMyComponentsSchema() {
    this.route.params.pipe(
      map(params => params.id2),
      flatMap(id2 => this.projectService.getComponentById(this.project.projectId, id2)))
      .subscribe((component: ProjectsComponent) => this.component = component);

    this.projectService.getComponents(this.project.projectId)
      .subscribe(components => this.componentNames = components.map(c => c.componentName),
        error => console.log(error),
        () => console.log(this.componentNames));
  }

  componentSchemaChange(componentSchema: string) {
    this.httpClient.get('http://localhost:8080/compRelation/compQualityAspects?name=' + componentSchema +
      '&projectId=' + this.project.projectId).subscribe((aspectTypes: string[]) => this.qualityAspects = aspectTypes);
  }

  onView1ProjectCharacterization() {
    this.httpClient.get('http://localhost:8080/create/View1?projectId=' + this.project.projectId + '&name=' + this.selectedComponent)
      .subscribe(value => {
        this.tableViewQA = value;
        console.log(this.tableViewQA);
      });
    this.tableViewQABool = true;
    console.log(this.selectedComponent);
  }

  onView2ProjectCharacterization() {
    this.httpClient.get('http://localhost:8080/create/View2?projectId=' + this.project.projectId + '&componentSchema=' +
      this.selectedComponent + '&qualityAspect=' + this.selectedAspect)
      .subscribe(value => this.tableViewQI = value);
    this.tableViewQIBool = true;
  }

  selectFile(event) {
    console.log(event);
    this.file = event.target.files;
  }

  cancelFile() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  uploadFile() {
    const formData: FormData = new FormData();
    let i;
    for (i = 0; i < this.file.length; i++) {
      formData.append('jsonFile', this.file[i]);
      console.log(this.file[i]);
    }
    formData.append('projectId', this.project.projectId);
    formData.append('name', this.componentSchemasName);

    this.httpClient.post('http://localhost:8080/create/uploadComponents', formData)
      .subscribe(value => console.log(value),
        error => console.log(error),
        () => console.log('complete'));
  }
}
