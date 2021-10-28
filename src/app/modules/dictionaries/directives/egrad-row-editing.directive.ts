import { Directive, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { BaseEditService } from '../services/base-edit.service';
import { BaseModelDTO } from 'src/app/webapi/models/base-model.dto';
import { FormGroup } from '@angular/forms';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[egradRowEditing]'
})
export class EgradRowEditingDirective implements OnInit, OnDestroy {
  private formGroup: FormGroup;
  private editedRowIndex: number;
  protected subscriptions: Subscription;

  @Input() gridEditService: BaseEditService<BaseModelDTO>;
  @Input('egradRowEditing') createModel: (args: any) => FormGroup;

  constructor(protected grid: GridComponent, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.subscriptions = this.grid.add.subscribe(this.addHandler.bind(this));
    this.subscriptions.add(this.grid.remove.subscribe(this.removeHandler.bind(this)));
    this.subscriptions.add(this.grid.edit.subscribe(this.editHandler.bind(this)));
    this.subscriptions.add(this.grid.cancel.subscribe(this.discardChangesHandler.bind(this)));
    this.subscriptions.add(this.grid.save.subscribe(this.saveChangesHandler.bind(this)));
    this.subscriptions.add(this.grid.dataStateChange.subscribe(this.onStateChange.bind(this)));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onStateChange() {
    this.closeEditor();
  }

  public addHandler(): void {
    this.closeEditor();

    this.formGroup = this.createModel({ isNew: true });

    this.grid.addRow(this.formGroup);
  }

  public removeHandler({ dataItem }) {
    const removeItem = (shouldRemove) => {
      if (shouldRemove) {
        this.gridEditService.remove(dataItem);
      }
    };

    const dialog = this.dialogService.open({
      title: 'Подтверждение',
      content: 'Вы уверены, что хотите удалить запись?',
      actions: [
        { text: 'Отмена', dialogResult: 'Cancel' },
        { text: 'Ок', primary: true, dialogResult: 'OK' }
      ]
    });

    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        removeItem(result.text === 'Ок');
      }
    });
  }

  public saveChangesHandler({ rowIndex, formGroup, isNew }): void {
    this.gridEditService.save(formGroup.value)
      .subscribe(() => {
        this.grid.closeRow(rowIndex);
      });
  }

  public discardChangesHandler({ rowIndex }): void {
    this.closeEditor();
  }

  public editHandler({ rowIndex, dataItem }): void {
    this.closeEditor();

    this.formGroup = this.createModel({ dataItem: dataItem });
    this.editedRowIndex = rowIndex;

    this.grid.editRow(rowIndex, this.formGroup);
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
