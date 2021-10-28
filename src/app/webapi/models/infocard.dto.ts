import {BaseModelDTO} from './base-model.dto';
import {OktmoDTO} from './oktmo.dto';

export class InfocardDTO extends BaseModelDTO {
  public Archived: boolean;
  public ArchivedBy__fullname: string;
  public CommDate: Date;
  public CommDateFormat: string = 'yyyy-MM-dd';
  public CreatedBy__fullname: string;
  public EnterDate: Date;
  public EnterDateFormat: string = 'yyyy-MM-dd';
  public FederalRoad: number = 5;
  public LengthComment: string;
  public Locations: OktmoDTO[];
  public RegNumber: string;
  public RoadLength: number;
  public RoadName: string;
  public RoadNumber: string;
  public owner: number;
  public owner__name: string;
  public owner__inn: string;

  public RoadCategory: string[];
  public RoadClass: string[];
  public RoadImportance: string;
  public RoadUsingType: string;

  public BookCost: number;
  public ResidualValue: number;
  public ResidualValueDate: Date;
  public ResidualValueDateFormat: string = 'yyyy-MM-dd';

  public Signed: boolean;
  public SignDate: Date;

  public updated_at: Date;
  public Status: string;

  constructor(data: any) {
    super(data);

    this.EnterDate = (data.EnterDate ? new Date(data.EnterDate) : null);
    this.CommDate = (data.CommDate ? new Date(data.CommDate) : null);
    this.SignDate = (data.SignDate ? new Date(data.SignDate) : null);
    this.ResidualValueDate = (data.ResidualValueDate ? new Date(data.ResidualValueDate) : null);
    this.Locations = (data.Locations ? data.Locations.map(i => new OktmoDTO(i)) : []);
    this.updated_at = (data.updated_at ? new Date(data.updated_at) : null);
  }
}

export interface InfocardResolved {
  infocard: InfocardDTO;
  error?: any;
}
