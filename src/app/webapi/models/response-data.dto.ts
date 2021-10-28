import {BaseModelDTO} from "./base-model.dto";
import {BaseDTO} from "./base.dto";

export class ResponseData<T extends BaseModelDTO> extends BaseDTO{
    count: number;
    next: string;
    previous: string;
    results: T[];

    constructor(data: any, getInstance: Function) {
        super(data);
        this.results = (this.results || []).map(getInstance.bind(this));
    }
}
