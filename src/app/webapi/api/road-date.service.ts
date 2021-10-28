import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { RoadDateDTO } from '../models/road-date.dto';
import { DatePipe } from '@angular/common';

@Injectable()
export class RoadDateAPIService extends BaseService<RoadDateDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/road_date/', authService, datePipe, basePath);
    }

    public getInstance(data: any): RoadDateDTO {
        return new RoadDateDTO(data);
    }
}
