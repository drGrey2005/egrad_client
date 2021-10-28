import { BaseModelDTO } from './base-model.dto';

export class RegionDTO extends BaseModelDTO {
    public Name: string;
    public FederalDistrict: number;

    constructor(data: any) {
        super(data);
    }
}
