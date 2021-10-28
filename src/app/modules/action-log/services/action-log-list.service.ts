import { Injectable } from '@angular/core';
import { ActionLogDTO } from 'src/app/webapi/models/action-log.dto';
import { BaseEditService } from '../../dictionaries/services/base-edit.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ActionLogListService extends BaseEditService<ActionLogDTO> {
  constructor() {
    super(null);
  }

  // protected fetch(inputArgs?: any): Observable<ActionLogDTO[]> {
  //   // const fakeObj: ActionLogDTO = {
  //   //   action_type: 'Создание',
  //   //   action_date: <Date>{},
  //   //   details: 'Какая-то инфокарта',
  //   //   action_by: 'admin',
  //   //   object_type: 'Инфокарта',
  //   //   prepareFormData: null
  //   // };
  //   //
  //   // const result: ActionLogDTO[] = [fakeObj, fakeObj];
  //   //
  //   // return of<ActionLogDTO[]>(result);
  // }
}
