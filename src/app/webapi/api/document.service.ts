import {Injectable, Inject, Optional} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {BASE_PATH} from '../variables';
import {DatePipe} from '@angular/common';
import {DocumentDTO} from '../models/document';

@Injectable()
export class DocumentAPIService extends BaseService<DocumentDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
              @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/document/', authService, datePipe, basePath);
  }

  public getInstance(data: any): DocumentDTO {
    return new DocumentDTO(data);
  }
}
