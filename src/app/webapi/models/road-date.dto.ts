import { BaseModelDTO } from './base-model.dto';

export class RoadDateDTO extends BaseModelDTO {
    public Infocard: number;
    public Name: string;
    public Start: number;
    public Finish: number;
    public CommDate: Date;
    public CommDateFormat: string = 'yyyy-MM-dd';

    constructor(data: any) {
        super(data);
        this.CommDate = (data.CommDate ? new Date(data.CommDate) : null);
    }
}
