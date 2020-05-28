import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectsService} from '../projects.service';

export interface Table {
  componentName: string;
  componentViewDTOS: ComponentViewDTO[];
}

export interface ComponentViewDTO {
  name: string;
  value: number;
}

@Component({
  selector: 'app-view-component-quality-aspect',
  styleUrls: ['view-component-quality-aspect.css'],
  templateUrl: 'view-component-quality-aspect.html',
})

export class ViewComponentQualityAspectComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _data: any;
  projectId: string;
  name: string;
  componentValuesMap = new Map();
  doubleMap = new Map(new Map());
  propertyValueMap = new Map();


  componentToPropertiesMap = new Map();


  components: string[];
  properties: string[];
  qaValuesArray: any[];
  valuesArray: any[];

  ngOnInit() {
    this.projectService.currentMessage.subscribe(message => this.projectId = message);
    console.log(this.projectId);
  }

  constructor(private httpClient: HttpClient, private projectService: ProjectsService) {
  }

  @Input()
  set data(d: Table[]) {
    this._data = JSON.parse(JSON.stringify(d));
    this.createTable();
  }

  private createTable() {
    console.log(this._data);

    function getNames(table) {

      const componentViewDTOS1 = [];
      const componentViewDTOS2 = [];
      table.forEach(table1 => {
        {
          componentViewDTOS1.push(table1.componentViewDTOS);
        }
      });
      componentViewDTOS1.forEach(table2 => {
        table2.forEach(table3 => {
          componentViewDTOS2.push(table3.name);
        });
      });

      return componentViewDTOS2.filter((v, i, a) => a.indexOf(v) === i);
    }

    function getValues(table, name) {  // imi ia valorile pe componenta

      const componentViewDTOS1 = [];
      const componentViewDTOS2 = [];
      table.forEach(table1 => {
        if (name === table1.componentName) {
          componentViewDTOS1.push(table1.componentViewDTOS);
        }
      });
      componentViewDTOS1.forEach(table2 => {
        table2.forEach(table3 => {
          componentViewDTOS2.push(table3.value);
        });
      });
      return componentViewDTOS2;
    }

    function getNamesPerComponent(table, name) {

      const componentViewDTOS1 = [];
      const componentViewDTOS2 = [];
      table.forEach(table1 => {
        if (name === table1.componentName) {
          componentViewDTOS1.push(table1.componentViewDTOS);
        }
      });
      componentViewDTOS1.forEach(table2 => {
        table2.forEach(table3 => {
          componentViewDTOS2.push(table3.name);
        });
      });
      return componentViewDTOS2;
    }

    // function getIndependentValues(data) {
    //
    //   const componentViewDTOS1 = [];
    //   const componentViewDTOS2 = [];
    //   data.forEach(table1 => {{componentViewDTOS1.push(table1.componentViewDTOS); } });
    //   componentViewDTOS1.forEach(table2 => {table2.forEach(table3 => {componentViewDTOS2.push(table3.value); }); });
    //
    //   return componentViewDTOS2;
    // }

    // function createColumn(i= 0, data) {
    //   const column = [];
    //   while (i < getIndependentValues(data).length) {
    //     column.push(getIndependentValues(data)[i]);
    //     i = i + 17;
    //   }
    //   return column;
    // }

    // for (let i = 0 ; i < getNames(this.data).length; i++) {
    //     this.propertyValuesMap.set(getNames(this.data)[i], createColumn(i, this.data));
    //   }
    // console.log(this.propertyValuesMap);  // proprietate -> valori Total Severity Score -> [3, 7]

    function getComponent(table) {
      const nameComponent = [];
      table.forEach(table3 => {
        nameComponent.push(table3.componentName);
      });
      return nameComponent;
    }

    for (const c of getComponent(this._data)) {
      this.componentValuesMap.set(c, getValues(this._data, c));
      this.propertyValueMap.set(getNamesPerComponent(this._data, c), getValues(this._data, c));
      console.log(getValues(this._data, c));


    }

    this._data.forEach((t: Table) => {
      this.componentToPropertiesMap.set(t.componentName, this.transformToMap(t.componentViewDTOS));
    });

    console.log(this.componentToPropertiesMap);

    this.properties = getNames(this._data); // toate headerele
    this.components = getComponent(this._data); // toate componentele
    this.qaValuesArray = Array.from(this.componentValuesMap.values()); // toate valorile QA-urilor
    this.valuesArray = Array.from(this.componentValuesMap.keys());
    this.doubleMap.set(this.valuesArray, this.propertyValueMap);

    console.log(this.doubleMap);
  }

  private transformToMap(componentViewDTOS: ComponentViewDTO[]): Map<string, number> {
    const propMap = new Map();
    componentViewDTOS.forEach((cvd: ComponentViewDTO) => {
      propMap.set(cvd.name, cvd.value);
    });

    return propMap;
  }
}
