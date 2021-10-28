import { Injectable, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { observe } from '@progress/kendo-angular-grid/dist/es2015/utils';

@Injectable()
export class ReportAPIService {
  private endpointUrl: string;
  constructor(private http: HttpClient, protected authService: AuthenticationService, @Inject(BASE_PATH) basePath: string) {
    this.endpointUrl = `${basePath}/api/export/`;
  }

  private getHeaders(): any {
    return new HttpHeaders().set('Authorization', 'Token ' + this.authService.getToken()).set('Accept', 'text/html');
  }

  public getInfocardPreview(id: number): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getInfocardPreview.');
    }

    return this.http
      .get(`${this.endpointUrl}infocard/${id}/html`, { headers: this.getHeaders(), responseType: 'text', observe: 'body' });
  }

  public getInfodocPreview(id: number): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getInfodocPreview.');
    }

    return this.http
      .get(`${this.endpointUrl}infodoc/${id}/html`, { headers: this.getHeaders(), responseType: 'text', observe: 'body' });
  }

  public getInfocardDownload(id: number, format: string) {
    return `${this.endpointUrl}infocard/${id}/${format}`;
  }

  public getInfodocDownload(id: number, format: string) {
    return `${this.endpointUrl}infodoc/${id}/${format}`;
  }

  public getInfocardCoverDownload(id: number, format: string) {
    return `${this.endpointUrl}infocard_cover/${id}/${format}`;
  }

  public getInfocardCover(id: number) {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getInfocardCover.');
    }

    return this.http
      .get(`${this.endpointUrl}infocard_cover/${id}/html`, { headers: this.getHeaders(), responseType: 'text', observe: 'body' });
  }
}
