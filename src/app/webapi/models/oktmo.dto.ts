import { BaseModelDTO } from './base-model.dto';

export class OktmoDTO extends BaseModelDTO {
  public Code: string;
  public Name2: string;
  public hasChildren: boolean;

  constructor(data: any) {
    super(data);
  }

  public static get Empty(): OktmoDTO {
    return new OktmoDTO({
      id: -1,
      Name2: '(Нет сведений)',
      hasChildren: false
    });
  }
}
