import {Pipe, PipeTransform} from '@angular/core';
import {InfocardDTO} from 'src/app/webapi/models/infocard.dto';

@Pipe({
  name: 'publicRoadsFormatted'
})
export class PublicRoadsFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values = <InfocardDTO[]>value;
    if (!values) {
      return value;
    }

    return values.map(function (item) {
      return item.RoadName;
    }).join(', ');
  }

}
