import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RoadDateDTO } from 'src/app/webapi/models/road-date.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectableSettings, GridDataResult, RowArgs } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { RoadDateEditService } from '../../services/road-date-edit.service';

@Component({
  selector: 'app-road-date',
  templateUrl: './road-date.component.html',
  styleUrls: ['./road-date.component.css']
})
export class RoadDateComponent implements OnInit {
  @Input() infocardId: number;
  @Input() readonly: boolean;

  public view: Observable<GridDataResult>;
  public selected: RoadDateDTO[] = [];
  public formGroup: FormGroup;
  private editedRowIndex: number;
  public selectableSettings = <SelectableSettings>{
    checkboxOnly: false,
    mode: 'single'
  };

  constructor(public editService: RoadDateEditService, private formBuilder: FormBuilder, private dialogService: DialogService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.view = this.editService.pipe(
      map((response: RoadDateDTO[]) => {
        return (<GridDataResult>{
          data: response,
          total: response.length,
        });
      })
    );

    this.editService.id = this.infocardId;
    this.editService.read();
  }
  public getSelectionKey(context: RowArgs): any {
    return context.dataItem;
  }

  public createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new RoadDateDTO({ 'Infocard': this.infocardId }) : args.dataItem;

    this.formGroup = this.formBuilder.group({
      'id': item.id,
      'Infocard': item.Infocard,
      'Name': [item.Name, Validators.required],
      'Start': [item.Start, Validators.required],
      'Finish': [item.Finish, Validators.required],
      'CommDate': item.CommDate
    });

    return this.formGroup;
  }
}
