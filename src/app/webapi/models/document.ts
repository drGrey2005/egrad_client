import {BaseModelDTO} from './base-model.dto';

export class DocumentDTO extends BaseModelDTO {
  public Infocard: number;
  public Name: string;

  constructor(data: any) {
    super(data);
  }
}
