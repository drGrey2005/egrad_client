import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {GridDataset} from 'src/app/modules/commons/services/grid-dataset';
import {InfocardDTO} from 'src/app/webapi/models/infocard.dto';
import {State} from '@progress/kendo-data-query';
import {InfocardAPIService} from 'src/app/webapi/api/infocard.service';
import {DataStateChangeEvent, GridDataResult, RowArgs} from '@progress/kendo-angular-grid';
import {InfocardFilterModes} from 'src/app/modules/dictionaries/models/infocard-commons';
import {RoadCommons} from 'src/app/modules/dictionaries/models/road-commons';
import {RegionAPIService} from 'src/app/webapi/api/region.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GridFilterService} from 'src/app/modules/commons/services/grid-filter.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActionLogAPIService} from 'src/app/webapi/api/action-log.service';
import {ActionLogDTO} from 'src/app/webapi/models/action-log.dto';
import {ActionLogOperations} from 'src/app/modules/dictionaries/models/action-log-commons';
import {ColorIndicatorDTO} from 'src/app/webapi/models/color-indicator.dto';
import {BASE_PATH} from '../../../../webapi/variables';

@Component({
  selector: 'app-infocard-grid',
  templateUrl: './infocard-grid.component.html',
  styleUrls: ['./infocard-grid.component.css']
})
export class InfocardGridComponent implements OnInit {
  @Input() public toolbar_content: TemplateRef<any>;
  @Output() dblClick = new EventEmitter<number>();

  private defaultState: State = {
    skip: 0,
    take: 30
  };
  public gridHeight = 500;

  public searchForm: FormGroup = new FormGroup({
    filter: new FormControl('')
  });

  public dataset: GridDataset;
  public selected: InfocardDTO[] = [];
  public state: State = {...this.defaultState};

  public roadImportance = RoadCommons.RoadImportanceItems;

  // ассоциативный массив, где ключ - ИД объекта
  // передается в regionFormatted пайп
  public regions: any = {};

  public filterModes = InfocardFilterModes;
  private _filterMode: InfocardFilterModes;
  public get filterMode(): InfocardFilterModes {
    return this._filterMode;
  }

  public set filterMode(value: InfocardFilterModes) {
    this._filterMode = value;
    this.appendFilter([{column: 'mode', value: value}]);
  }

  // public owner: number = null;
  private _owner: number;
  public set owner(value: number) {
    this._owner = value;
    console.log(this._owner);
    this.appendFilter([{column: 'owner', value: value.toString()}]);
  }

  // Показывать/скрывать колонку с иконками статусов инфокарт (База, Архив, Черновик)
  // Может скрываться правами или иначе
  public showStatusColumn = false;

  // Показывать/скрывать колонку со значением дороги (Федеральная, Региональная, ...)
  public showRoadModeColumn = false;

  // Показывать/скрывать колонку со значением дороги (Федеральная, Региональная, ...)
  public showColorIndicatorColumn = false;

  // Полученные цвета для индикаторов
  public colorIndicators: ColorIndicatorDTO[] = [];

  private defaultColor = '#212529';

  isPopup = false;

  constructor(
    private infocardService: InfocardAPIService,
    private regionService: RegionAPIService,
    private gridFilterService: GridFilterService,
    private actionLogService: ActionLogAPIService,
    @Inject(BASE_PATH) public basePath: string
  ) {
    regionService.list().subscribe(data => data.forEach(val => (this.regions[val.id] = val)));
    this.dataset = new GridDataset(this.infocardService);
  }

  ngOnInit(): void {
    this.resizeGrid();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeGrid();
  }

  public appendFilter(filterValue: { column: string; value: string }[]) {
    this.state.filter = this.gridFilterService.appendFilter(this.state.filter, filterValue);
  }

  public refresh(): void {
    this.dataset.query(this.state);
    this.selected = [];
  }

  public moveToFirstPage(): void {
    this.state.skip = 0;
    this.refresh();
  }

  public getSelectionKey(context: RowArgs): any {
    return context.dataItem;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.refresh();
  }

  /* Экспорт в эксель */
  public allData = (): Observable<any> => {
    const state: State = Object.assign({}, this.state);

    state.take = 10000000;
    state.skip = 0;

    this.actionLogService.save(
      new ActionLogDTO({
        operation: ActionLogOperations.ListExport,
        type: this.filterMode,
        data: ''
      })
    )
      .subscribe();

    const params = this.infocardService.getParamsFromState(state);
    return this.infocardService.query(params).pipe(
      map((response: any) => {
        console.log(response);
        return <GridDataResult>{
          data: response.results,
          total: response.count
        };
      })
    );
  };

  public search(): void {
    if (!this.searchForm.valid) {
      return;
    }

    this.state.filter = this.gridFilterService.appendFilter(this.state.filter, [
      {column: 'search', value: this.searchForm.value.filter}
    ]);
    this.refresh();
  }

  public dblClickEvent(event) {
    this.dblClick.emit(event.path[1].rowIndex);
  }

  public getColor(type: string, updated: Date): string {
    if (!updated) {
      return this.defaultColor;
    }

    // считаем количество полных дней
    const diffDays = Math.floor(((new Date()).getTime() - updated.getTime()) / (1000 * 3600 * 24));

    const colors: ColorIndicatorDTO[] = this.colorIndicators.filter(i => i.type == type);
    console.log(colors);

    for (let i = 0; i < colors.length; i++) {
      if (diffDays <= colors[i].days) {
        return colors[i].color;
      }
    }

    return this.defaultColor;
  }

  private resizeGrid() {
    // TODO: Мне такое не нравится, но я не знаю как по-другому
    const navHeight = document.querySelector('nav').clientHeight;
    const footerHeight = document.querySelector('.fixed-bottom').clientHeight;

    this.gridHeight = window.innerHeight - navHeight - footerHeight - 165;
  }

  gotoInfocard(id: number): void {
    window.open(`${this.basePath}/infocards/${id}/edit`, '_blank');
  }
}
