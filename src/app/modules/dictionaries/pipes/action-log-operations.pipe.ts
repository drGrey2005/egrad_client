import {Pipe, PipeTransform} from '@angular/core';
import {ActionLogCommons} from '../models/action-log-commons';

@Pipe({
  name: 'actionLogOperationsFormatted'
})
export class ActionLogOperationsFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }

    const item = ActionLogCommons.OperationItems.find(i => i.value == value);

    return item ? item.text : value;
  }
}
