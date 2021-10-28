import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { RoadSectionDTO } from '../models/road-section.dto';
import { DatePipe } from '@angular/common';

@Injectable()
export class RoadSectionAPIService extends BaseService<RoadSectionDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/road_section/', authService, datePipe, basePath);
    }

    public getInstance(data: any): RoadSectionDTO {
        return new RoadSectionDTO(data);
    }
}
