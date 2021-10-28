import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { OktmoAPIService } from 'src/app/webapi/api/oktmo.service';
import { Observable } from 'rxjs';
import { OktmoDTO } from 'src/app/webapi/models/oktmo.dto';
import { State } from '@progress/kendo-data-query';
import { ResponseData } from 'src/app/webapi/models/response-data.dto';
import { map, tap } from 'rxjs/operators';
import { CheckableSettings, TreeItemLookup } from '@progress/kendo-angular-treeview';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-oktmo-tree',
  templateUrl: './oktmo-tree.component.html',
  styleUrls: ['./oktmo-tree.component.css']
})
export class OktmoTreeComponent implements OnInit {
  public data: Observable<OktmoDTO[]>;
  public formGroup: FormGroup = new FormGroup({
    filter: new FormControl('')
  });

  protected state: State = <State>{};
  protected loading: boolean;

  private _checkedItems: OktmoDTO[];
  @Input()
  public set checkedItems(value: OktmoDTO[]) {
    this._checkedItems = value.slice();
    this.checkedKeys = this._checkedItems.map(x => x.id);
  }
  public get checkedItems(): OktmoDTO[] {
    return this._checkedItems;
  }

  public onlyTopLevel = false;
  public checkedKeys: number[];

  public checkBy({ dataItem }) {
    return (<OktmoDTO>dataItem).id;
  }

  public handleChecking(itemLookup: TreeItemLookup): void {
    const existIdx = this.findContainsIndex(itemLookup.item.dataItem);
    if (existIdx > -1) {
      this.checkedItems.splice(existIdx, 1);
    }
    else {
      this.checkedItems.push(itemLookup.item.dataItem);
    }
  }

  private findContainsIndex(dataItem: OktmoDTO): number {
    return this.checkedItems.findIndex(function (oktmo) { return dataItem.id === oktmo.id; });
  }

  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: false,
      checkParents: false,
      enabled: true,
      mode: 'multiple'
    };
  }

  public removeItem(item: OktmoDTO) {
    const existIdx = this.findContainsIndex(item);
    if (existIdx > -1) {
      this.checkedItems.splice(existIdx, 1);
      this.checkedKeys.splice(existIdx, 1);
    }
  }

  constructor(protected oktmoApiService: OktmoAPIService) {
  }

  public ngOnInit(): void {
    this.loading = true;

    const params = this.oktmoApiService.getParamsFromState(this.state);
    this.data = this.oktmoApiService.query(params)
      .pipe(
        map((response: ResponseData<OktmoDTO>) => {
          return Object.values(response).sort(sortByName);
        }),
        tap(() => this.loading = false),
      );
  }

  public hasChildren = (item: OktmoDTO) => !this.onlyTopLevel && item.hasChildren;

  public fetchChildren = (item: OktmoDTO) => this.oktmoApiService.fetch(this.formGroup.value.filter, item.Code);

  public search(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.data = this.oktmoApiService.fetch(this.formGroup.value.filter, null)
      .pipe(
        map((response: ResponseData<OktmoDTO>) => {
          return Object.values(response).sort(sortByName);
        }),
        tap(() => this.loading = false),
      );
  }
}

function sortByName(o1: OktmoDTO, o2: OktmoDTO): number {
  if (o1.Name2 < o2.Name2) { return -1; }
  if (o1.Name2 > o2.Name2) { return 1; }
  return 0;
}
