import {Injectable} from '@angular/core';

@Injectable()
export class KmAndMConverter {
  public transform(value: string): string {
    if (!value) {
      return value;
    }

    const parts = value.split('.');
    return `${parts[0]}+${parts[1]}`;
  }

  public parse(value: string): string {
    if (!value) {
      return value;
    }

    const parts = value.split('+');
    if (parts.length === 1) {
      return `${parts[0]}.000`;
    }

    if (parts.length === 2) {
      const km = +parts[0].trim();

      if (isNaN(km)) {
        return null;
      }

      const m = +parts[1].trim();

      return `${km}.${m.toString().padStart(3, '0')}`;
    }

    return null;
  }
}
