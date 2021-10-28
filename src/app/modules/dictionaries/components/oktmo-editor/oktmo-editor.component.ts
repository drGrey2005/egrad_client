import { Component, OnInit, ElementRef, forwardRef, ViewChild, Input } from '@angular/core';
import { OktmoTreeComponent } from '../oktmo-tree/oktmo-tree.component';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { OktmoDTO } from 'src/app/webapi/models/oktmo.dto';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OktmoValuesFormattedPipe } from '../../pipes/oktmo-values-formatted.pipe';

@Component({
  selector: 'app-oktmo-editor',
  templateUrl: './oktmo-editor.component.html',
  styleUrls: ['./oktmo-editor.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: OktmoEditorComponent, multi: true }]
})
export class OktmoEditorComponent implements ControlValueAccessor, OnInit {
  protected _value: OktmoDTO[];
  private dialog: DialogRef;
  public displayValue: string;

  // Выводить только верхний уровень дерева
  @Input() onlyTopLevel: boolean;

  constructor(private host: ElementRef, private dialogService: DialogService,
    private oktmoValuesFormatService: OktmoValuesFormattedPipe) {
  }

  public set value(val: OktmoDTO[]) {
    this.setValue(val);
    this.onChangeCallback(this._value);
  }

  public get value() {
    return this._value;
  }

  get input(): HTMLInputElement {
    return this.host.nativeElement;
  }

  @ViewChild('display') textArea;

  public get isDisabled(): boolean {
    return this.host.nativeElement.disabled;
  }

  public click() {
    if (!this.isDisabled) {
      this.showForm();
    }
  }

  public showForm() {
    this.dialog = this.dialogService.open({
      title: 'ОКТМО',
      content: OktmoTreeComponent,
      actions: [
        { text: 'Отмена' },
        { text: 'OK', primary: true }
      ],
      width: 650,
      height: 650,
      minWidth: 250
    });

    const oktmoTreeControl = <OktmoTreeComponent>this.dialog.content.instance;
    oktmoTreeControl.checkedItems = this.value || [];
    oktmoTreeControl.onlyTopLevel = this.onlyTopLevel;

    this.dialog.result.subscribe((result) => {
      if ((<any>result).text === 'OK') {
        this.value = oktmoTreeControl.checkedItems;
      }
      this.onTouchedCallback();
    });
  }

  ngOnInit() {
  }

  private setValue(val: OktmoDTO[]) {
    this._value = val || [];
    this.displayValue = this.oktmoValuesFormatService.transform(val);
    this.textArea.nativeElement.innerText = this.displayValue;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.setValue(obj);
    } else {
      this._value = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }

  private onChangeCallback = (data: any) => { };

  private onTouchedCallback = () => { };
}
