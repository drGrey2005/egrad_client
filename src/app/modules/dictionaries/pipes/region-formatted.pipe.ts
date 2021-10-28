import { Pipe, PipeTransform } from '@angular/core';
import {RegionDTO} from "../../../webapi/models/region.dto";

@Pipe({
  name: 'regionFormatted'
})
// пайп создан как единственная точка преобразования ИД регионов в текст
// создан как костыль, пока не появится возможность получить объект региона с сервера целиком
export class RegionFormattedPipe implements PipeTransform {

  transform(values: number[], regions: RegionDTO[]): any {
    if (!values) return null;

    const result: string[] = [];
    values.forEach(val => result.push(regions[val].Name));

    return result.join(', ');
  }

}
