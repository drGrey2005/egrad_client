import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {BASE_PATH} from '../webapi/variables';

@Injectable()
export class AuthenticationService {
  private readonly basePath: string;
  redirectUrl: string;
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  isAuthenticated: Observable<boolean>;

  private readonly tokenConst = 'access_token';

  constructor(private http: HttpClient, @Inject(BASE_PATH) basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
    this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
  }

  authenticate(username: string, password: string): Observable<any> {
    // const url = `${this.basePath}/api/token-auth/`;
    const url = `${this.basePath}/api/auth/token_auth/`;

    return this.http.post(url,
      {username: username, password: password})
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenConst, (<any>res).token);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenConst);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenConst);
  }
}
