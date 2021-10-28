import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public password: string;
  public errorMessage: string;
  public formSubmitted = false;
  public loading: boolean;

  private fieldNames: { [key: string]: string } = {
    userName: 'Логин',
    password: 'Пароль'
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  authenticate(form: NgForm) {
    this.formSubmitted = true;
    delete this.errorMessage;

    if (form.valid) {
      this.authenticationService
        .authenticate(this.userName, this.password)
        .subscribe(
          res => {
            const path = this.authenticationService.redirectUrl;
            if (path) {
              this.router.navigateByUrl(path);
            } else {
              this.router.navigateByUrl('/infocards');
            }
          },
          error => {
            this.loading = false;
            if (error.status === 400) {
              this.errorMessage = 'Неверные логин/пароль';
            } else if (error.status === 0) {
              this.errorMessage = 'Отсутствует связь с сервером.';
            } else {
              this.errorMessage =
                'Неизвестная ошибка. Обратитесь к администратору.';
            }
          }
        );
      this.formSubmitted = false;
    } else {
      this.errorMessage = 'Проблема со входом в систему';
    }
  }

  getValidationMessages(state: any, thingName?: string): string[] {
    const result: string[] = [];
    thingName = thingName || state.path;

    if (!state.errors) {
      return result;
    }

    if (state.errors.required) {
      result.push(`Не заполнено поле ${thingName}`);
    }

    return result;
  }

  getFormValidationMessages(form: NgForm) {
    const messages: string[] = [];

    Object.keys(form.controls).forEach(c =>
      this.getValidationMessages(form.controls[c], this.fieldNames[c]).forEach(
        m => messages.push(m)
      )
    );

    return messages;
  }
}
