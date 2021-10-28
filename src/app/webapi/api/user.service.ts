import { Injectable, Optional, Inject } from '@angular/core';
import { UserDTO } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BASE_PATH } from '../variables';
import { BaseService } from './base.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserAPIService extends BaseService<UserDTO> {
  constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
    @Optional() @Inject(BASE_PATH) basePath: string) {
    super(http, 'api/user/', authService, datePipe, basePath);
  }

  public getInstance(data: any): UserDTO {
    return new UserDTO(data);
  }

  public getCurrent(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.endpointUrl}current/`, { headers: this.getHeaders() });
  }
}
