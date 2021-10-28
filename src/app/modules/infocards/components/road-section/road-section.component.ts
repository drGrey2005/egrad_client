import { Component, OnInit, Input, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { GridDataResult, GridComponent, RowArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { RoadSectionDTO } from 'src/app/webapi/models/road-section.dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { RoadCommons } from '../../../dictionaries/models/road-commons';
import { RoadSectionEditService } from '../../services/road-section-edit.service';
import { map } from 'rxjs/operators';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import '../../../dictionaries/directives/egrad-row-editing.directive';
const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item['value']] = item;
    return obj;
  }, {});

@Component({
  selector: 'app-road-section',
  templateUrl: './road-section.component.html',
  styleUrls: ['./road-section.component.css']
})
export class RoadSectionComponent implements OnInit, OnDestroy {
  @Input() readonly: boolean;
  @Input() infocardId: number;

  public view: Observable<GridDataResult>;
  public roadClasses = RoadCommons.RoadClasses;
  public roadClassesObj = arrayToObject(this.roadClasses);
  public roadCategories = RoadCommons.RoadCategories;
  public roadCategoriesObj = arrayToObject(this.roadCategories);
  public roadUsingTypes = RoadCommons.RoadUsageTypes;
  public roadUsageTypesObj = arrayToObject(this.roadUsingTypes);

  public selected: RoadSectionDTO[] = [];
  public formGroup: FormGroup;

  private editedRowIndex: number;
  public selectableSettings = <SelectableSettings>{
    checkboxOnly: false,
    mode: 'single'
  };

  constructor(public editService: RoadSectionEditService, private formBuilder: FormBuilder, private dialogService: DialogService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.view = this.editService.pipe(
      map((response: RoadSectionDTO[]) => {
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
    const item = args.isNew ? new RoadSectionDTO({ 'Infocard': this.infocardId, 'Length': 0 }) : args.dataItem;

    this.formGroup = this.formBuilder.group({
      'id': item.id,
      'Infocard': item.Infocard,
      'Name': [item.Name, Validators.required],
      'Start': [item.Start, Validators.required],
      'Finish': [item.Finish, Validators.required],
      'Length': [item.Length],
      'RoadCategory': [item.RoadCategory],
      'RoadClass': [item.RoadClass],
      'RoadUsingType': [item.RoadUsingType],
    });

    this.formGroup.get('RoadCategory').valueChanges
      .subscribe(value => this.onCategoryChange(value));

    return this.formGroup;
  }

  private onCategoryChange(category: string) {
    if (this.formGroup) {
      const cl = RoadCommons.RoadCategoryToClass[category];
      this.formGroup.get('RoadClass').setValue(cl);
    }
  }
}
