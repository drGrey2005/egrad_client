import { Component, OnInit, HostListener } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent, RowArgs } from '@progress/kendo-angular-grid';

import { GridDataset } from 'src/app/modules/commons/services/grid-dataset';
import { RoadOwnerDTO } from 'src/app/webapi/models/road-owner.dto';
import { RoadOwnerAPIService } from 'src/app/webapi/api/road-onwer.service';
import { GridFilterService } from 'src/app/modules/commons/services/grid-filter.service';
import { ColorIndicatorAPIService } from 'src/app/webapi/api/color-indicator.service';
import { ColorIndicatorDTO } from 'src/app/webapi/models/color-indicator.dto';
import { InfocardGridComponent } from 'src/app/modules/dictionaries/components/infocard-grid/infocard-grid.component';
import { DialogService } from '@progress/kendo-angular-dialog';
import { NotifyService } from 'src/app/modules/commons/services/notify.service';

@Component({
  selector: 'app-road-owner-list',
  templateUrl: './road-owner-list.component.html',
  styleUrls: ['./road-owner-list.component.css']
})
export class RoadOwnerListComponent implements OnInit {
  public dataset: GridDataset;
  public selected: RoadOwnerDTO[] = [];
  public state: State = {
    skip: 0,
    take: 30
  };
  public gridHeight = 500;

  colorIndicators: ColorIndicatorDTO[];
  public noInfocards = false;

  constructor(
    private apiService: RoadOwnerAPIService,
    private gridFilterService: GridFilterService,
    private colorIndicatorService: ColorIndicatorAPIService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {
    this.colorIndicatorService.list().subscribe(data => this.colorIndicators = data);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeGrid();
  }

  ngOnInit(): void {
    this.resizeGrid();
    this.dataset = new GridDataset(this.apiService);
    this.dataset.query(this.state);
  }

  public getSelectionKey(context: RowArgs): any {
    return context.dataItem;
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.selected.length = 0;
    this.state = state;
    this.dataset.query(state);
  }

  public canBlockUser(entity: RoadOwnerDTO): boolean {
    if (!entity) {
      return false;
    }

    return entity.Users && entity.Users[0] && entity.Users[0].is_active;
  }

  public activateUser(entity: RoadOwnerDTO): void {
    this.apiService.activate(entity.id).subscribe(dto => {
      this.refresh();
    });
  }

  public deactivateUser(entity: RoadOwnerDTO): void {
    this.apiService.deactivate(entity.id).subscribe(dto => {
      this.refresh();
    });
  }

  public deleteUser(entity: RoadOwnerDTO): void {
    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите удалить пользователя?',
      actions: [
        { text: 'Отмена', dialogResult: 'Cancel' },
        { text: 'Ок', primary: true, dialogResult: 'OK' }
      ]
    });

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        this.apiService.delete(entity.id)
          .subscribe(() => {
            this.notifyService.show(`Пользователь успешно удален`);
            this.refresh();
          });
      }
    });
  }

  public noInfocardsBtnClick(event) {
    this.noInfocards = !this.noInfocards;

    this.state.filter = this.gridFilterService.appendFilter(this.state.filter,
      [{ column: 'TotalCount', value: this.noInfocards ? '0' : '' }]);
    this.refresh();
  }

  public refresh(): void {
    this.dataset.query(this.state);
    this.selected = [];
  }

  private defaultColor = '#212529';
  public getColor(type: string, updated: Date): string {
    if (!updated) {
      return this.defaultColor;
    }

    //считаем количество полных дней
    const diffDays = Math.floor(((new Date()).getTime() - updated.getTime()) / (1000 * 3600 * 24));

    const colors: ColorIndicatorDTO[] = this.colorIndicators.filter(i => i.type == type);

    for (let i = 0; i < colors.length; i++) {
      if (diffDays <= colors[i].days) {
        return colors[i].color;
      }
    }

    return this.defaultColor;
  }

  public countClicked(type: string, item: RoadOwnerDTO) {
    let title = '';
    if (type === 'base') {
      title = 'База инфокарт.';
    } else if (type === 'draft') {
      title = 'Черновики инфокарт.';
    } else if (type === 'archive') {
      title = 'Архив инфокарт.';
    }

    title += ' Собственник: ';
    title += item.Organization.Name;

    const dialog = this.dialogService.open({
      title: title,
      content: InfocardGridComponent,
      width: 800
    });

    const control = dialog.content.instance;
    control.filterMode = type;
    control.owner = item.id;
    control.showColorIndicatorColumn = true;
    control.colorIndicators = this.colorIndicators;
    control.refresh();
  }

  private resizeGrid() {
    const navHeight = document.querySelector('nav').clientHeight;
    const footerHeight = document.querySelector('.fixed-bottom').clientHeight;

    this.gridHeight = window.innerHeight - navHeight - footerHeight - 45;
  }
}
