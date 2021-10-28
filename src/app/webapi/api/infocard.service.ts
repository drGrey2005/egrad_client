import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfocardDTO } from '../models/infocard.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { Observable } from 'rxjs';
import { RoadSectionDTO } from '../models/road-section.dto';
import { map } from 'rxjs/operators';
import { RoadDateDTO } from '../models/road-date.dto';
import { DatePipe } from '@angular/common';
import { RoadTollDTO } from '../models/road-toll.dto';
import { DocumentDTO } from '../models/document';
import { RoadPlaceDTO } from '../models/road-place.dto';
import { CryptoBaseService } from './crypto-base.service';

@Injectable()
export class InfocardAPIService extends CryptoBaseService<InfocardDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
    @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/infocard/', authService, datePipe, basePath);
  }

  public getInstance(data: any): InfocardDTO {
    return new InfocardDTO(data);
  }

  public getSections(infocardId: number): Observable<RoadSectionDTO[]> {
    return this.http
      .get(`${this.endpointUrl}${infocardId}/sections/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map(item => new RoadSectionDTO(item))),
      );
  }

  public getDates(infocardId: number): Observable<RoadDateDTO[]> {
    return this.http
      .get(`${this.endpointUrl}${infocardId}/dates/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map(item => new RoadDateDTO(item))),
      );
  }

  public getTolls(infocardId: number): Observable<RoadTollDTO[]> {
    return this.http
      .get(`${this.endpointUrl}${infocardId}/tolls/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map(item => new RoadTollDTO(item))),
      );
  }

  public getDocuments(infocardId: number): Observable<DocumentDTO[]> {
    return this.http
      .get(`${this.endpointUrl}${infocardId}/documents/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map(item => new DocumentDTO(item))),
      );
  }

  public getPlaces(infocardId: number): Observable<RoadPlaceDTO[]> {
    return this.http
      .get(`${this.endpointUrl}${infocardId}/places/`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map(item => new RoadPlaceDTO(item))),
      );
  }

  public archive(infocardId: number, data: { ArchiveReason: string, CaseLocation: string }): Observable<InfocardDTO> {
    return this.http
      .post(`${this.endpointUrl}${infocardId}/archive/`, data, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => new InfocardDTO(response))
      );
  }

  public change_case_location(infocardId: number, data: { CaseLocation: string }): Observable<InfocardDTO> {
    return this.http
      .post(`${this.endpointUrl}${infocardId}/change_case_location/`, data, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => new InfocardDTO(response))
      );
  }

  public simpleSign(infocardId: number): Observable<InfocardDTO> {
    const data = {};

    return this.http
      .post(`${this.endpointUrl}${infocardId}/simple_sign/`, data, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => new InfocardDTO(response))
      );
  }
}
