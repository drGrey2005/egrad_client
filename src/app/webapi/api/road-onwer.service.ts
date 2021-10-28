import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { DatePipe } from '@angular/common';
import { RoadOwnerDTO } from '../models/road-owner.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoadOwnerAPIService extends BaseService<RoadOwnerDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
    @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/road_owner/', authService, datePipe, basePath);
  }

  public getInstance(data: any): RoadOwnerDTO {
    return new RoadOwnerDTO(data);
  }

  public getMyOwner(): Observable<RoadOwnerDTO> {
    return this.http
      .get(`${this.endpointUrl}my/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }

  public activate(roadOwnerId: number): Observable<RoadOwnerDTO>{
    return this.http
      .get(`${this.endpointUrl}${roadOwnerId}/activate/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }

  public deactivate(roadOwnerId: number): Observable<RoadOwnerDTO>{
    return this.http
      .get(`${this.endpointUrl}${roadOwnerId}/deactivate/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => {
          return this.getInstance(response);
        }),
      );
  }
}
