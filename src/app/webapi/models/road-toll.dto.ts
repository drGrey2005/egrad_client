import { BaseModelDTO } from './base-model.dto';
import {OktmoDTO} from "./oktmo.dto";

export class RoadTollDTO extends BaseModelDTO {
    public Infocard: number;
    public Name: string;
    public Start: number;
    public Finish: number;
    public Length: number;
    public Tollbooth: number;
    public Locations: OktmoDTO[];

    constructor(data: any) {
        super(data);

        this.Locations = data.Locations ? data.Locations.map(i => new OktmoDTO(i)) : [];
    }
}
