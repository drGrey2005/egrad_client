import { Directive, ViewContainerRef, AfterViewInit, KeyValueDiffers, Input, KeyValueDiffer, DoCheck, } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidationMessageFor]'
})
export class ValidationMessageForDirective implements AfterViewInit, DoCheck {
  private differ: KeyValueDiffer<any, any>;
  private field: AbstractControl;
  private errorElement: HTMLDivElement;

  private validationMessages = {
    required: 'Поле обязательно для заполнения.',
    min: 'Значение меньше минимального'
  };

  @Input() appValidationMessageFor: FormGroup;

  constructor(private container: ViewContainerRef, private differs: KeyValueDiffers) { }

  ngAfterViewInit() {
    const inputControl = this.container.element.nativeElement;
    const fieldName = inputControl.attributes['formControlName'].value;

    this.field = this.appValidationMessageFor.get(fieldName);
    this.differ = this.differs.find(this.field).create();

    const div = document.createElement('div');
    div.classList.add('field-error-message');
    div.setAttribute('hidden', '');
    inputControl.parentNode.appendChild(div);
    this.errorElement = div;
  }

  ngDoCheck() {
    if (this.differ && this.differ.diff(this.field) && this.field.touched) {
      if (this.field.errors) {
        const message = Object.keys(this.field.errors)
          .map(key => this.validationMessages[key]).join(' ');
        this.errorElement.innerText = message;
      }

      this.errorElement.hidden = !this.field.errors;
    }
  }
}
