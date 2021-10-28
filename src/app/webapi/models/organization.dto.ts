import { BaseModelDTO } from './base-model.dto';
import { OktmoDTO } from './oktmo.dto';

export class OrganizationDTO extends BaseModelDTO {
  public Name: string;
  public CName: string;
  public EgrulDate: Date;
  public HeadName: string;
  public Ogrn: string;
  public Inn: string;
  public KPP: string;
  public OKOGU: string;
  public OKPO: string;
  public OKVED: string;
  public OKOPF: string;
  public OKFS: string;
  public OKTMO: OktmoDTO;

  constructor(data: any) {
    super(data);
  }

  public static get Empty(): OrganizationDTO {
    return new OrganizationDTO({
      id: -1,
      Name: this.EmptyName
    });
  }

  public static get EmptyName(): string {
    return '(Нет сведений)';
  }
}
