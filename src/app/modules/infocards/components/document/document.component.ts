import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GridComponent, GridDataResult, RowArgs} from '@progress/kendo-angular-grid';
import {InfocardAPIService} from 'src/app/webapi/api/infocard.service';
import {DocumentEditService} from '../../services/document-edit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentDTO} from 'src/app/webapi/models/document';
import {Observable} from 'rxjs';
import {SelectableSettings} from '@progress/kendo-angular-treeview';
import {map} from 'rxjs/operators';

const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item['value']] = item;
    return obj;
  }, {});

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @ViewChild(GridComponent)
  private grid: GridComponent;

  @Input() infocardId: number;
  @Input() readonly: boolean;

  public gridData: DocumentDTO[] = [];
  public view: Observable<GridDataResult>;
  public selected: DocumentDTO[] = [];
  public formGroup: FormGroup;

  private editedRowIndex: number;
  private removeConfirmation: Observable<any>;
  public selectableSettings = <SelectableSettings>{
    checkboxOnly: false,
    mode: 'single'
  };

  constructor(
    private apiService: InfocardAPIService,
    public editService: DocumentEditService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.view = this.editService.pipe(
      map((response: DocumentDTO[]) => {
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
      ? new DocumentDTO({Infocard: this.infocardId, Length: 0})
      : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      Infocard: item.Infocard,
      Name: [item.Name, Validators.required]
    });

    return this.formGroup;
  }
}
