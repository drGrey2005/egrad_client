import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GridComponent, GridDataResult, RowArgs} from '@progress/kendo-angular-grid';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectableSettings} from '@progress/kendo-angular-treeview';
import {DialogService} from '@progress/kendo-angular-dialog';
import {map} from 'rxjs/operators';
import {RoadPlaceDTO} from 'src/app/webapi/models/road-place.dto';
import {RoadPlaceEditService} from 'src/app/modules/infocards/services/road-place.edit.service';

@Component({
  selector: 'app-road-place',
  templateUrl: './road-place.component.html',
  styleUrls: ['./road-place.component.css']
})
export class RoadPlaceComponent implements OnInit {
  @ViewChild(GridComponent)
  private grid: GridComponent;

  @Input() infocardId: number;
  @Input() readonly: boolean;

  public gridData: RoadPlaceDTO[] = [];
  public view: Observable<GridDataResult>;
  public selected: RoadPlaceDTO[] = [];
  public formGroup: FormGroup;

  private editedRowIndex: number;
  private removeConfirmation: Observable<any>;
  public selectableSettings = <SelectableSettings>{
    checkboxOnly: false,
    mode: 'single'
  };

  constructor(
    public editService: RoadPlaceEditService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.view = this.editService.pipe(
      map((response: RoadPlaceDTO[]) => {
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
      ? new RoadPlaceDTO({Infocard: this.infocardId, Length: 0})
      : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      Infocard: item.Infocard,
      Name: [item.Name, Validators.required],
      Start: [item.Start, Validators.required],
      Finish: [item.Finish, Validators.required],
      Length: [item.Length],
      Locations: [item.Locations],
    });

    return this.formGroup;
  }
}
