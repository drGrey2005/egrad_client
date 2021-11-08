import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GridComponent, GridDataResult, RowArgs} from '@progress/kendo-angular-grid';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectableSettings} from '@progress/kendo-angular-treeview';
import {RoadTollEditService} from '../../services/road-toll-edit.service';
import {map} from 'rxjs/operators';
import {RoadTollDTO} from 'src/app/webapi/models/road-toll.dto';
import {DialogService} from '@progress/kendo-angular-dialog';

const arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item['value']] = item;
    return obj;
  }, {});

@Component({
  selector: 'app-road-toll',
  templateUrl: './road-toll.component.html',
  styleUrls: ['./road-toll.component.css']
})
export class RoadTollComponent implements OnInit {
  @ViewChild(GridComponent)
  private grid: GridComponent;

  @Input() infocardId: number;
  @Input() readonly: boolean;

  public gridData: RoadTollDTO[] = [];
  public view: Observable<GridDataResult>;
  public selected: RoadTollDTO[] = [];
  public formGroup: FormGroup;

  private editedRowIndex: number;
  private removeConfirmation: Observable<any>;
  public selectableSettings = <SelectableSettings>{
    checkboxOnly: false,
    mode: 'single'
  };

  constructor(
    public editService: RoadTollEditService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.view = this.editService.pipe(
      map((response: RoadTollDTO[]) => {
        return <GridDataResult>{
          data: response,
          total: response.length
        };
      })
    );

    this.editService.id = this.infocardId;
    this.editService.read();
  }

  public getSelectionKey(context: RowArgs): any {
    return context.dataItem;
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew
      ? new RoadTollDTO({Infocard: this.infocardId, Length: 0})
      : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      Infocard: item.Infocard,
      Place: item.Place,
      Name: [item.Name, Validators.required],
      Start: [item.Start, Validators.required],
      Finish: [item.Finish, Validators.required],
      Length: [item.Length],
      Tollbooth: [item.Tollbooth],
      Locations: [item.Locations],
    });

    return this.formGroup;
  }
}
