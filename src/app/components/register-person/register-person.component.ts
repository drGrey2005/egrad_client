import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonDTO } from 'src/app/webapi/models/person';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.css']
})
export class RegisterPersonComponent implements OnInit {
  public errorMessage: string;
  public formSubmitted = false;
  public person: PersonDTO = new PersonDTO();

  constructor() { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.formSubmitted = true;
    delete this.errorMessage;

    if (form.valid) {
      this.formSubmitted = false;
    } else {
      this.errorMessage = 'Проблема с регистрацией';
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
