import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDTO } from 'src/app/webapi/models/user';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/webapi/api/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public errorMessage: string;
  public formSubmitted = false;
  public userType: string;
  public user: UserDTO = new UserDTO();

  constructor(private router: Router, private service: UserAPIService) {
    this.userType = 'person';
  }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.formSubmitted = true;
    delete this.errorMessage;

    if (form.valid) {
      this.formSubmitted = false;

      if (this.user.password !== form.value.password_confirm) {
        this.errorMessage = 'Пароль и подтверждение пароля не совпадают';
        return;
      }

      /*this.service.save(this.user).subscribe(
        data => {
          if (this.userType === 'person') {
            this.router.navigateByUrl('/entrance/register/person');
          } else {
            this.router.navigateByUrl('/entrance/register/org');
          }
        },
        err => this.errorMessage = err.message
      );*/
      if (this.userType === 'person') {
        this.router.navigateByUrl('/register/person');
      } else {
        this.router.navigateByUrl('/register/org');
      }
    } else {
      this.errorMessage = 'Проблема с регистрацией пользователя';
    }
  }

  getValidationMessages(state: any, thingName?: string): string[] {
    const result: string[] = [];
    thingName = thingName || state.path;

    if (!state.errors) {
      return result;
    }

    if (state.errors.required) {
      result.push('Не заполнено поле');
      // result.push(`Не заполнено поле ${thingName}`);
    }
    if (state.errors.email) {
      result.push('Некорректный адрес электронной почты');
    }
    if (state.errors.pattern) {
      result.push('Недопустимое значение');
    }
    if (state.errors.minlength) {
      result.push(`Поле ${thingName} должно быть длиной не менее ${state.errors.minlength.requiredLength} символов`);
    }

    return result;
  }

}
