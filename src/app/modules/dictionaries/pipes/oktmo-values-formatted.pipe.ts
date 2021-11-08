import {Pipe, PipeTransform} from '@angular/core';
import {OktmoDTO} from 'src/app/webapi/models/oktmo.dto';

@Pipe({
  name: 'oktmoValuesFormatted'
})
export class OktmoValuesFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const oktmoValues = <OktmoDTO[]>value;
    if (!oktmoValues) {
      return value;
    }

    return oktmoValues.map(function (item) {
      return item.Name2;
    }).join(', ');
  }
}
