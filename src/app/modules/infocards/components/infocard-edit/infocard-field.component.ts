import { Component, OnInit, Input, HostBinding, ContentChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-infocard-field',
  template: `
    <div class="row">
      <label class="col-md-4 col-form-label label-required"
        [class.invalid]="isControlInvalid(fieldName)">{{label}}</label>
      <div class="col-md-8">
        <ng-content></ng-content>
      </div>
    </div>`,
  styles: []
})
export class InfocardFieldComponent implements OnInit {
  @Input() label: string;
  @Input() form: FormGroup;
  @HostBinding('class') hostClass = 'form-group col-md-6';
  @ContentChild('editControl') editor: ElementRef;
  fieldName: string;

  constructor() { }

  ngOnInit() {
    let edt = this.editor;
    if (!(edt instanceof ElementRef)) {
      edt = (<any>this.editor).hostElement
        || (<any>this.editor).host
        || (<any>this.editor).element;
    }

    const host = edt instanceof ElementRef
      ? edt.nativeElement
      : edt;

    this.fieldName = host.getAttribute('formControlName');

    if (!host.tagName.includes('DATE') && !host.tagName.includes('NUMERIC')) {
      host.classList.add('egrad-form-control');
    }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.invalid;
  }
}
