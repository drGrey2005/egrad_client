import {Pipe, PipeTransform} from '@angular/core';
import {RoadCommons} from '../models/road-commons';

@Pipe({
  name: 'roadImportanceFormatted'
})
export class RoadImportanceFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }

    //Получаем текстовое описание по номеру
    return RoadCommons.RoadImportanceItems.find(val => val.code === value).text;
  }
}
