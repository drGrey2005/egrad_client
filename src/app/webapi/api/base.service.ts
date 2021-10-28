import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FilterDescriptor, State} from '@progress/kendo-data-query';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseModelDTO} from '../models/base-model.dto';
import {ResponseData} from '../models/response-data.dto';
import {Inject} from '@angular/core';
import {BASE_PATH} from '../variables';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {DatePipe} from '@angular/common';

export abstract class BaseService<T extends BaseModelDTO> {
  private BASE_URL = 'http://localhost:7000/';
  protected basePath: string;

  constructor(protected http: HttpClient, protected path: string, protected authService: AuthenticationService,
              protected datePipe: DatePipe,
              @Inject(BASE_PATH) basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    } else {
      this.basePath = this.BASE_URL;
    }
  }

  protected get endpointUrl() {
    return `${this.basePath}/${this.path}`;
  }

  protected getHeaders(): any {
    return new HttpHeaders().set('Authorization', 'Token ' + this.authService.getToken());
  }

  // преобразует состояние грида в HttpParams для запроса к бэкенду
  public getParamsFromState(state: State): HttpParams {
    let params: HttpParams = new HttpParams();

    if (!state) {
      return params;
    }

    if (state.take) {
      params = params.append('limit', state.take.toString());
    }

    if (state.skip) {
      params = params.append('offset', state.skip.toString());
    }

    if (state.sort) {
      state.sort.forEach(sorting => {
        if (sorting.dir) {
          params = params.append('ordering', (sorting.dir === 'desc' ? '-' : '') + sorting.field);
        }
      });
    }

    if (state.filter) {
      const filters: FilterDescriptor[] = <FilterDescriptor[]>state.filter.filters;
      let value;
      if (filters) {
        filters.forEach(filter => {
          if (filter.value !== '' && filter.value !== null) {
            if (filter.value instanceof Date) {
              const d: Date = filter.value;
              value = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            } else {
              value = filter.value.toString();
            }

            params = params.append(<string>filter.field, value);
          }
        });
      }
    }

    return params;
  }

  public list(params?: any): Observable<T[]> {
    return this.http
      .get(`${this.endpointUrl}`, {headers: this.getHeaders(), params: params})
      .pipe(
        map((response: any) => {
          if(response.results)
          {
            return response.results.map(this.getInstance.bind(this));
          }
          return response.map(this.getInstance.bind(this));
        }),
      );
  }

  /// метод получения ResponseData по переданным параметрам грида
  public query(params?: any): Observable<ResponseData<T>> {
    return this.http
      .get(`${this.endpointUrl}`, {headers: this.getHeaders(), params: params})
      .pipe(
        map((response: any) => {
          return new ResponseData<T>(response, this.getInstance);
        }),
      );
  }

  /// метод получения сущности
  public get(id: number): Observable<T> {
    return this.http
      .get(`${this.endpointUrl}${id}/`, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }

  /// метод создания/редактирования сущности.
  /// избавляет от необходимости принимать решение какой метод нужно вызывать
  public save(data: T): Observable<T> {
    const id = data.id;
    const preparedData = this.convertToApiDate(data);

    if (id) {
      return this.put(id, preparedData);
    } else {
      return this.post(preparedData);
    }
  }

  /// метод создания сущности
  protected post(data: T): Observable<T> {
    return this.http
      .post(`${this.endpointUrl}`, data, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }

  /// метод редактирования сущности
  protected put(id: number, data: T, submethod: string = ''): Observable<T> {
    return this.http
      .put(`${this.endpointUrl}${id}/${submethod}`, data, {headers: this.getHeaders()})
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }

  /// метод удаления сущности
  // надо подумать над возвращаемым типом и как будет контролироваться проверка
  public delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.endpointUrl}${id}/`, {headers: this.getHeaders()});
  }

  /// метод оборачивания данных в ДТО. должен быть переопределен наследниками
  public getInstance(data: any): T {
    return (<T>data);
  }

  private convertToApiDate(data: T): any {
    if (!data) {
      return data;
    }
    const result = this.getInstance(data);

    for (const key of Object.keys(result)) {
      const value = result[key];
      if (value instanceof Date && !!result[key + 'Format']) {
        result[key] = this.datePipe.transform(value, result[key + 'Format']);
      }
    }

    return result;
  }
}
