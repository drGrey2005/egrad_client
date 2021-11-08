import {Inject, Injectable, Optional} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {BASE_PATH} from '../variables';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OktmoDTO} from '../models/oktmo.dto';
import {DatePipe} from '@angular/common';

@Injectable()
export class OktmoAPIService extends BaseService<OktmoDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
              @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/oktmo/', authService, datePipe, basePath);
  }

  public getInstance(data: any): OktmoDTO {
    return new OktmoDTO(data);
  }

  public fetch(filter: string, code: string): Observable<OktmoDTO[]> {
    let params: HttpParams = new HttpParams();

    if (filter) {
      params = params.append('filter', filter);
    }

    if (code) {
      params = params.append('code', code);
    }

    return this.http
      .get(`${this.endpointUrl}`, {headers: this.getHeaders(), params: params})
      .pipe(
        map((response: any) => {
          return <OktmoDTO[]>response;
        }),
      );
  }
}
