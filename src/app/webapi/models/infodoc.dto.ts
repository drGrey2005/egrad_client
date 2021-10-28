import { BaseModelDTO } from './base-model.dto';
import { SignerDTO } from './signer.dto';
import { InfocardDocDTO } from './infocard-doc.dto';

export class InfodocDTO extends BaseModelDTO {
  public RequestorType: string;
  public RequestOrganization: string;
  public RequestDate: Date;
  public RequestDateFormat = 'yyyy-MM-dd';
  public Number: string;
  public CreationDate: Date;
  public CreationDateFormat = 'yyyy-MM-dd';
  public PaymentInfo: string;
  public PaymentFlag: boolean;
  public Infocards: InfocardDocDTO[];
  public signer: SignerDTO;
  public Done: boolean;
  public Signed: boolean;

  constructor(data: any) {
    super(data);

    this.RequestDate = (data.RequestDate ? new Date(data.RequestDate) : null);
    this.CreationDate = (data.CreationDate ? new Date(data.CreationDate) : null);

    this.Infocards = !data.Infocards ? [] : data.Infocards.map(card => new InfocardDocDTO(card || {}));
    this.signer = data.signer ? new SignerDTO(data.signer) : null;
  }
}
