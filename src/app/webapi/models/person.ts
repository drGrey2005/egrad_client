import { BaseModelDTO } from './base-model.dto';

export class PersonDTO extends BaseModelDTO {
  public first_name: string;
  public last_name: string;
  public sur_name: string;
  public date_of_birth: Date;
  public doc_name: string;
  public doc_number: string;
  public region: string;
  public post_address: string;
  public phone: string;
  public fax: string;
  public owner_email: string;
  public inn: string;
  public right_doc_details: string;
  public right_doc_type: RightDocType;
}

enum RightDocType {
  Oper = 'O', // Оперативное управление
  Trust = 'T', // Доверительное управление
  Ownership = 'W' // Собственность
}
