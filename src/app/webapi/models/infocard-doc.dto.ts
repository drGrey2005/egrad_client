import {BaseModelDTO} from './base-model.dto';

export class InfocardDocDTO extends BaseModelDTO {
  public RegNumber: string;
  public EnterDate: Date;
  public RoadName: string;
  public RoadNumber: string;
  public Parts: Array<string>;
  public Status: string;

  constructor(data: any) {
    super(data);

    this.EnterDate = (data.EnterDate ? new Date(data.EnterDate) : null);
    this.Parts = data.Parts || [];
  }
}
