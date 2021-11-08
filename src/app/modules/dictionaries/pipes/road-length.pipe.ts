import {Pipe, PipeTransform} from '@angular/core';
import {KmAndMConverter} from '../services/km-and-m.converter';

/*
 * Формат начала/конца участка А/Д.
 * Usage:
 *   value | roadLength
 * Example:
 *   {{ "2.032" | roadLength }}
 *   formats to: 2+032 км
*/
@Pipe({name: 'roadLength'})
export class RoadLengthPipe implements PipeTransform {
  constructor(private converterService: KmAndMConverter) {
  }

  transform(value: string): string {
    const result = this.converterService.transform(value);
    if (!result) {
      return result;
    }

    return `${result} км`;
  }
}
