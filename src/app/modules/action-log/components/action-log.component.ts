import { Component, OnInit, HostListener } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ActionLogAPIService } from "src/app/webapi/api/action-log.service";
import { GridDataset } from "src/app/modules/commons/services/grid-dataset";
import { ActionLogCommons } from "src/app/modules/dictionaries/models/action-log-commons";

@Component({
  selector: 'app-action-log',
  templateUrl: './action-log.component.html',
  styleUrls: ['./action-log.component.css']
})
export class ActionLogComponent implements OnInit {
  public dataset: GridDataset;
  public state: State = {
    skip: 0,
    take: 30
  };
  public gridHeight = 500;

  public actionLogOperations = ActionLogCommons.OperationItems;
  public actionLogTypes = ActionLogCommons.TypeItems;

  @HostListener('window:resize')
  onResize() {
    this.resizeGrid();
  }

  constructor(private apiService: ActionLogAPIService) {
    this.dataset = new GridDataset(apiService);
  }

  ngOnInit() {
    this.resizeGrid();
    this.refreshData();
  }

  public refreshData(): void {
    this.dataset.query(this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.refreshData();
  }

  private resizeGrid() {
    const navHeight = document.querySelector('nav').clientHeight;
    const footerHeight = document.querySelector('.fixed-bottom').clientHeight;

    this.gridHeight = window.innerHeight - navHeight - footerHeight - 45;
  }
}
