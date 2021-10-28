import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { BaseService } from 'src/app/webapi/api/base.service';
import { BaseModelDTO } from 'src/app/webapi/models/base-model.dto';
import { tap } from 'rxjs/operators';

const itemIndex = (item: any, data: any[]): number => {
  for (let idx = 0; idx < data.length; idx++) {
    if (data[idx].id === item.id) {
      return idx;
    }
  }

  return -1;
};

@Injectable()
export class BaseEditService<T extends BaseModelDTO> extends BehaviorSubject<T[]> {
  public id: number;
  private data: T[] = [];
  public loading: boolean;

  constructor(private apiService: BaseService<T>) {
    super([]);
  }

  public read() {
    this.loading = true;

    this.fetch(this.id)
      .subscribe(data => {
        this.data = data;
        super.next(data);
        this.loading = false;
      }, error => {
        this.loading = false;
        throw error;
      });
  }

  public save(item: T): Observable<T> {
    this.loading = true;

    return this.apiService.save(item).pipe(tap(
      response => {
        this.reset();
        this.read();

        this.loading = false;
      },
      error => {
        this.loading = false;
        throw error;
      }));
  }

  public remove(item: T): void {
    this.loading = true;

    this.apiService.delete(item.id).subscribe(
      () => {
        this.reset();
        this.read();

        this.loading = false;
      },
      error => {
        this.loading = false;
        throw error;
      });
  }

  public assignValues(target: T, source: T): void {
    Object.assign(target, source);
  }

  private reset() {
    this.data = [];
  }

  protected fetch(inputArgs?: any): Observable<T[]> {
    return this.apiService.list();
  }
}
