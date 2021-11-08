import {Inject, Injectable, Optional} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {BASE_PATH} from '../variables';
import {DatePipe} from '@angular/common';
import {ActionLogDTO} from '../models/action-log.dto';

@Injectable()
export class ActionLogAPIService extends BaseService<ActionLogDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
              @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/action_log/', authService, datePipe, basePath);
  }

  public getInstance(data: any): ActionLogDTO {
    return new ActionLogDTO(data);
  }
}
