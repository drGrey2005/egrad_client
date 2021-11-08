import {Injectable, Inject, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {BASE_PATH} from '../variables';
import {DatePipe} from '@angular/common';
import {InfodocDTO} from '../models/infodoc.dto';
import {CryptoBaseService} from './crypto-base.service';

@Injectable()
export class InfodocAPIService extends CryptoBaseService<InfodocDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
              @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/infodoc/', authService, datePipe, basePath);
  }

  public getInstance(data: any): InfodocDTO {
    return new InfodocDTO(data);
  }
}
