import { BaseModelDTO } from './base-model.dto';

export class ActionLogDTO extends BaseModelDTO {
  public date: Date;
  public operation: string;
  public type: string;
  public data: string;
  public user_login: string;
  public user_fullname: string;
  public user_organization: string;
}
