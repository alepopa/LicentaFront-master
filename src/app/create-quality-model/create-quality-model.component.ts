import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from '../projects/projects.service';

@Component({
  selector: 'app-create-quality-model',
  templateUrl: './create-quality-model.component.html',
  styleUrls: ['./create-quality-model.component.css']
})

export class CreateQualityModelComponent implements OnInit {
  map = new Map();
  properties: string[];
  files: string[];
  tableQI: any;
  tableQIBool = false;
  projectId: string;
  data: any;
  qMName: string;
  allProjectIds: string[];
  qualityIndicators: string[];
  selectedEntity: string;
  qiList: any[] = [{
    qiName: ''
  }];
  json: string;
  axisString: string;
  axis: any[] = [{
    id: 1,
    name: ''
  }];
  axisList: any[] = [{
    axisName: ''
  }];
  axisList2: string[];
  qiList2: string[];

  addAxis() {
    this.axis.push({
      id: this.axis.length + 1,
      name: ''});
  }

  removeAxis(i: number) {
    this.axis.splice(i, 1);
  }

  logValue() {
    console.log(this.axis);
  }

  constructor(private projectsService: ProjectsService, private httpClient: HttpClient,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.selectedEntity);
    this.projectsService.getProjects().subscribe(projects => this.allProjectIds = projects.map(p => p.projectId));
  }

  viewQualityModel() {
    this.httpClient.get('http://localhost:8080/create/ViewDinamic?projectId=' + this.projectId)
      .subscribe(value => this.tableQI = value);
    this.tableQIBool = true;
  }

  projectIdChange(projectId: string) {
    // refresh the form
    // TODO: show an alert you are about to lose your work because of this change
    const answer = window.confirm('Lose data?');
    if (answer) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.selectedEntity = null;
      this.httpClient.get('http://localhost:8080/relation/allIndicators?projectId=' + projectId)
        .subscribe((qualityIndicators: string[]) => this.qualityIndicators = qualityIndicators);
    }
  }

  selectAxisForQI(qi: string) {
    console.log(this.axisString, ' corespunde la ', qi);
    this.qiList.push({
        qiName: qi
      });
    this.axisList.push({
        axisName: this.axisString
      });

    this.axisString = null;
  }

  // should actually be createChart -> should send the form to the backend to get JSON to crete the chart
  showResults() {
    this.json = '{\n' +
      '  "projectId ":' + String(this.projectId) + ', ' +
      '  "qAName ": ' + String(this.qMName) + ', ' +
      ' "Indicators": [\n ' + '    {\n' + '      "type": ' + String(this.qualityIndicators) + '}],' +
      ' "Axises": [\n ' + '    {\n' + '      "type": ' + String(this.axis[0].name) + '}]';


    console.log(this.json);
    console.log(this.qiList);

    function addQiInList(myQiList) {
      const qiList = [];
      for (let i = 0; i < myQiList.length; i++) {
        console.log(myQiList[i].qiName);
        qiList.push(myQiList[i].qiName);
      }
      return qiList;
    }

    function addAxisesInList(myAxisesList) {
      const axisesList = [];
      for (let i = 0; i < myAxisesList.length; i++) {
        console.log(myAxisesList[i].axisName);
        axisesList.push(myAxisesList[i].axisName);
      }
      return axisesList;
    }

    this.qiList2 = addQiInList(this.qiList);
    this.axisList2 = addAxisesInList(this.axisList);

    // const body = {
    //   projectId: this.projectId,
    //   qMName: this.qMName,
    //   qualityIndicators: this.qiList2,
    //   qIAxis: this.axisList2
    // };
    //
    // this.httpClient.post('http://localhost:8080/create/relation', body).subscribe(value => {
    //   this.data = value;
    //   console.log(value);
    // });

    const formData: FormData = new FormData();
    let i;
    for (i = 0; i < this.qiList2.length; i++) {
      formData.append('qualityIndicators', this.qiList2[i]);
      console.log(this.qiList2[i]);
    }
    formData.append('projectId', this.projectId);
    formData.append('qMName', this.qMName);
    for (i = 0; i < this.axisList2.length; i++) {
      formData.append('qIAxis', this.axisList2[i]);
      console.log(this.axisList2[i]);
    }

    this.httpClient.post('http://localhost:8080/create/relation', formData)
      .subscribe(value => {
        this.data = value;
        console.log(value); });
        // error => console.log(error),
        // () => console.log('complete')});
  }

  // saveAsPNGFLG() {
  //   this.buttonView = true;
  // }
}
