import {FormArray, FormGroup} from '@angular/forms';
import {BaseModelDTO} from './base-model.dto';

export abstract class BaseDTO {
  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }

  /// TODO перенести ???
  /// подготавливает данные для формы
  /// отбрасывает свойства, не проверяемые формой, для корректной работы form.setValue
  public prepareFormData(form) {
    const data = {};
    // null нужен для т.к. форма не может обработать undefined
    for (const controlName of Object.keys(form.controls)) {
      if (form.controls[controlName] instanceof FormGroup) {
        data[controlName] = this[controlName].prepareFormData(form.controls[controlName]);
      } else if (form.controls[controlName] instanceof FormArray) {
        const arrValue = <Array<BaseModelDTO>>(this[controlName] || []);
        data[controlName] = arrValue.map(function (item, i, arr) {
          return item.prepareFormData(form.controls[controlName].controls[i]);
        });
      } else {
        data[controlName] = this[controlName] || null;
      }
    }
    return data;
  }
}
