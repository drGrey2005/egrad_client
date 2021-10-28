import { BaseModelDTO } from './base-model.dto';
import {OktmoDTO} from "./oktmo.dto";

export class RoadPlaceDTO extends BaseModelDTO {
    public Infocard: number;
    public Name: string;
    public Start: number;
    public Finish: number;
    public Locations: OktmoDTO[];
    public Length: number;

    constructor(data: any) {
        super(data);

        this.Length = +data.Length;
        this.Locations = data.Locations ? data.Locations.map(i => new OktmoDTO(i)) : [];
    }
}
