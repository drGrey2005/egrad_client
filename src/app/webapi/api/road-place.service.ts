import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { DatePipe } from '@angular/common';
import { RoadPlaceDTO } from "src/app/webapi/models/road-place.dto";

@Injectable()
export class RoadPlaceAPIService extends BaseService<RoadPlaceDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/road_place/', authService, datePipe, basePath);
    }

    public getInstance(data: any): RoadPlaceDTO {
        return new RoadPlaceDTO(data);
    }
}
