import { BaseModelDTO } from './base-model.dto';

export class FederalRoadDTO extends BaseModelDTO {
  public RoadName: string;
  public RoadNumber: string;
  public RoadType: string;

  constructor(data: any) {
    super(data);
  }
}
