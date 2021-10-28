import { BaseModelDTO } from './base-model.dto';

export class UserDTO extends BaseModelDTO {
  public username: string;
  public password: string;
  public email: string;
  public first_name: string;
  public last_name: string;
  public user_phone: string;
  public is_active: boolean;
  public is_staff: boolean;
  public is_superuser: boolean;
  public last_login: Date;
  public date_joined: Date;

  constructor(data?: any) {
    super(data);
  }

  public static get Empty(): UserDTO {
    return new UserDTO({
      id: -1,
      last_name: '(Нет сведений)',
      first_name: ''
    });
  }
}
