import { Directive, Renderer2, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KmAndMConverter } from '../services/km-and-m.converter';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[km-and-m]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: KmAndMDirective, multi: true }]
})
export class KmAndMDirective implements ControlValueAccessor {

  private _valueChanged = false;
  private _value: string | null;
  private _displayValue: string | null;

  @Input('egrad-required') required = false;

  constructor(private host: ElementRef, private convertService: KmAndMConverter) {
    // костыль. запрет на ввод нечисловых символов
    // дополнительно разрешен плюсик
    this.host.nativeElement.onkeypress = (event) => {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 43) {
        this._valueChanged = true;
        return true;
      }
      return false;
    };
  }

  get input(): HTMLInputElement {
    return this.host.nativeElement;
  }

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    this._value = v;
    this._changeCallback(v);
  }

  @HostListener('blur') onTouched(): void {
    if (this._displayValue !== this.input.value) {
      this._displayValue = this.input.value;
      this._value = this.convertService.parse(this._displayValue);

      this._onTouchedCallback();
    }
  }

  @HostListener('change') onChange(): void {
    if (this._displayValue !== this.input.value) {
      this._displayValue = this.input.value;
      this._value = this.convertService.parse(this._displayValue);

      this._changeCallback(this._value);
    }
  }

  @HostListener('keyup') onkeyup(): void {
    if (this._valueChanged) {
      this.onChange();
    }
  }

  writeValue(value: any) {
    this._value = value;
    this._displayValue = this.convertService.transform(value);
    this.input.value = this._displayValue;
  }

  registerOnChange(fn: any): void {
    this._changeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }

  private _changeCallback = (data: any) => { };

  private _onTouchedCallback = () => { };
}
