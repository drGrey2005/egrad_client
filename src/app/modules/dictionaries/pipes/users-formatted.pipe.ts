import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from 'src/app/webapi/models/user';

@Pipe({
  name: 'usersFormatted'
})
export class UsersFormattedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values = <UserDTO[]>value;
    if (!values) {
      return value;
    }

    return values.map(function (item) { return item.username; }).join(', ');
  }

}
