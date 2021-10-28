import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { DatePipe } from '@angular/common';
import { ColorIndicatorDTO } from "src/app/webapi/models/color-indicator.dto";

@Injectable()
export class ColorIndicatorAPIService extends BaseService<ColorIndicatorDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/color_indicator/', authService, datePipe, basePath);
    }

    public getInstance(data: any): ColorIndicatorDTO {
        return new ColorIndicatorDTO(data);
    }
}
