import {Component, Input, OnInit} from '@angular/core';

export interface Table {
  fileName: string;
  fileViewDTOS: FileViewDTO[];
}

export interface FileViewDTO {
  name: string;
  value: number;
}
@Component({
  selector: 'app-view-quality-model',
  templateUrl: './view-quality-model.component.html',
  styleUrls: ['./view-quality-model.component.css']
})

export class ViewQualityModelComponent implements OnInit {
  private table: any;
  map = new Map();
  fileValuesMap = new Map();
  propertyValueMap = new Map();
  doubleMap = new Map(new Map());
  properties: string[];
  files: string[];
  qaValuesArray: any[];
  valuesArray: any[];
  projectId: string;
  json: string;
  // private table_svg: any;
  axis: any[] = [{
    id: 1,
    name: ''
  }];

  constructor() {
  }

  ngOnInit() {

  }
  //
  // @Input()
  // set captureScreenshot(captureScreenshot: boolean) {
  //   if (isNullOrUndefined(captureScreenshot)) {
  //     return;
  //   }
  //   if (captureScreenshot) {
  //     this.saveAsPng();
  //   } else {
  //     return;
  //   }
  // }
  //
  // saveAsPng() {
  //   if (!isNullOrUndefined(this.table_svg)) {
  //     saveSvgAsPng(this.table_svg, 'table.png');
  //   }
  // }

  @Input()
  set data(table: Table) {
    this.table = JSON.parse(JSON.stringify(table));
    this.createTable();
    // this.table_svg = document.getElementById('myId');
  }

  private createTable() {

    console.log(this.table);

    function getNames(table) {

      const componentViewDTOS1 = [];
      const componentViewDTOS2 = [];
      table.forEach(table1 => {
        {
          componentViewDTOS1.push(table1.fileViewDTOS);
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
        if (name === table1.fileName) {
          componentViewDTOS1.push(table1.fileViewDTOS);
        }
      });
      componentViewDTOS1.forEach(table2 => {
        table2.forEach(table3 => {
          componentViewDTOS2.push(table3.value);
        });
      });
      return componentViewDTOS2;
    }

    function getFile(table) {
      const nameFile = [];
      table.forEach(table3 => {
        nameFile.push(table3.fileName);
      });
      return nameFile;
    }

    function getNamesPerFile(table, name) {

      const componentViewDTOS1 = [];
      const componentViewDTOS2 = [];
      table.forEach(table1 => {
        if (name === table1.fileName) {
          componentViewDTOS1.push(table1.fileViewDTOS);
        }
      });
      componentViewDTOS1.forEach(table2 => {
        table2.forEach(table3 => {
          componentViewDTOS2.push(table3.name);
        });
      });
      return componentViewDTOS2;
    }

    for (const c of getFile(this.table)) {
      this.fileValuesMap.set(c, getValues(this.table, c));
      this.propertyValueMap.set(getNamesPerFile(this.table, c), getValues(this.table, c));
      // console.log(getValues(this.table, c));
    }

    this.properties = getNames(this.table);
    this.files = getFile(this.table);
    this.qaValuesArray = Array.from(this.fileValuesMap.values()); // toate valorile QA-urilor
    this.valuesArray = Array.from(this.fileValuesMap.keys());
    this.doubleMap.set(this.valuesArray, this.propertyValueMap);
    console.log(this.doubleMap);
  }
}
