import { BaseModelDTO } from './base-model.dto';
import {OktmoDTO} from "./oktmo.dto";

export class RoadSectionDTO extends BaseModelDTO {
    public Infocard: number;
    public Name: string;
    public Start: number;
    public Finish: number;
    public Length: number;
    public RoadCategory: string;
    public RoadClass: string;
    public RoadUsingType: string;

    constructor(data: any) {
        super(data);

        this.Length = +data.Length;
    }
}
