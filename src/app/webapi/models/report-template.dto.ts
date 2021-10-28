import { BaseModelDTO } from './base-model.dto';

export class ReportTemplateDTO extends BaseModelDTO {
    public report_name: string;
    public name: string;
    public params: string[];
    public params_titled: string;

    constructor(data: any) {
        super(data);
    }
}
