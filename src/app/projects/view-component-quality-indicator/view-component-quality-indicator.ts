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
  selector: 'app-view-component-quality-indicator',
  styleUrls: ['view-component-quality-indicator.css'],
  templateUrl: 'view-component-quality-indicator.html',
})

export class ViewComponentQualityIndicatorComponent implements OnInit {
  private table: any;
  projectId: string;
  componentValuesMap = new Map();
  propertyValueMap = new Map();
  doubleMap = new Map(new Map());
  names: string[];
  values: number[];
  components: string[];
  properties: string[];
  elements: any;
  qaValuesArray: any[];
  propertyArray: any[];
  valuesArray: any[];

  ngOnInit() {
    this.projectService.currentMessage.subscribe(message => this.projectId = message);
    console.log(this.projectId);
  }

  constructor(private httpClient: HttpClient, private projectService: ProjectsService) {
  }

  @Input()
  set data(table: Table) {
    this.table = JSON.parse(JSON.stringify(table));
    this.createTable();
  }

  private createTable() {

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

    console.log(getNames(this.table));  // imi ia o data toate proprietatile

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

    // function getIndependentValues(table) {
    //
    //   const componentViewDTOS1 = [];
    //   const componentViewDTOS2 = [];
    //   table.forEach(table1 => {
    //     {
    //       componentViewDTOS1.push(table1.componentViewDTOS);
    //     }
    //   });
    //   componentViewDTOS1.forEach(table2 => {
    //     table2.forEach(table3 => {
    //       componentViewDTOS2.push(table3.value);
    //     });
    //   });
    //
    //   return componentViewDTOS2;
    // }

    function getComponent(table) {
      const nameComponent = [];
      table.forEach(table3 => {
        nameComponent.push(table3.componentName);
      });
      return nameComponent;
    }

    for (const c of getComponent(this.table)) {
      this.componentValuesMap.set(c, getValues(this.table, c));
      this.propertyValueMap.set(getNamesPerComponent(this.table, c), getValues(this.table, c));
      console.log(getValues(this.table, c));
    }
    // console.log(this.componentValuesMap); // componentValueMap - valorile pe componenta
    // console.log(this.propertyValueMap);

    this.properties = getNames(this.table);
    this.components = getComponent(this.table); // toate componentele
    this.qaValuesArray = Array.from(this.componentValuesMap.values());
    this.propertyArray = Array.from(this.propertyValueMap.keys());
    this.valuesArray = Array.from(this.componentValuesMap.keys());
    this.doubleMap.set(this.valuesArray, this.propertyValueMap);

    // console.log(this.componentValuesMap.keys());
    console.log(this.doubleMap);
  }
}
