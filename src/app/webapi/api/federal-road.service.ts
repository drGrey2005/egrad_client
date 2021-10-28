import {Inject, Injectable, Optional} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {DatePipe} from '@angular/common';
import {BASE_PATH} from '../variables';
import {FederalRoadDTO} from '../models/federal-road.dto';

@Injectable()
export class FederalRoadAPIService extends BaseService<FederalRoadDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
              @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/federal_road/', authService, datePipe, basePath);
  }

  public getInstance(data: any): FederalRoadDTO {
    return new FederalRoadDTO(data);
  }
}
