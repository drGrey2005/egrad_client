import { BaseModelDTO } from './base-model.dto';

export class SignerDTO extends BaseModelDTO {
  public name: string;
  public position: string;

  constructor(data: any) {
    super(data);
  }

  public static get Empty(): SignerDTO {
    return new SignerDTO({
      id: -1,
      name: '(Нет сведений)'
    });
  }
}
