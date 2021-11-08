import {BaseModelDTO} from './base-model.dto';
import {UserDTO} from './user';
import {OrganizationDTO} from './organization.dto';

export class RoadOwnerDTO extends BaseModelDTO {
  public Users: UserDTO[];
  public Person: string;
  public Organization: OrganizationDTO;
  public PostAddress: string;
  public Phone: string;
  public Fax: string;
  public UserPhone: string;
  public Email: string;
  public Position: string;
  public RightDocType: string;
  public RightDocDetails: string;
  public OwnerType: string;
  public Region: string;

  public BaseCount: number;
  public DraftCount: number;
  public ArchiveCount: number;
  public TotalCount: number;

  public BaseUpdated: Date;
  public DraftUpdated: Date;
  public ArchiveUpdated: Date;

  public get Name(): string {
    if (this.Organization) {
      return this.Organization.Name;
    }
    return '';
  }

  public get IsActive(): boolean {
    if (this.Users.length) {
      return this.Users[0].is_active;
    }
    return false;
  }

  constructor(data: any) {
    super(data);

    this.Users = data.Users.map(user => new UserDTO(user || {}));
    this.Organization = new OrganizationDTO(this.Organization || {});
    this.BaseUpdated = (data.BaseUpdated ? new Date(data.BaseUpdated) : null);
    this.DraftUpdated = (data.DraftUpdated ? new Date(data.DraftUpdated) : null);
    this.ArchiveUpdated = (data.ArchiveUpdated ? new Date(data.ArchiveUpdated) : null);
  }

  public static get Empty(): RoadOwnerDTO {
    return new RoadOwnerDTO({
      id: -1,
      Users: [],
      Organization: new OrganizationDTO({Name: '(Нет сведений)'})
    });
  }
}
