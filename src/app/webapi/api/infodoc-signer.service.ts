import {Inject, Injectable, Optional} from "@angular/core";
import {BaseService} from "./base.service";

import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {DatePipe} from "@angular/common";
import {BASE_PATH} from "../variables";
import {SignerDTO} from "../models/signer.dto";

@Injectable()
export class InfodocSignerAPIService extends BaseService<SignerDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/infodoc_signer/?is_actual=true', authService, datePipe, basePath);
    }

    public getInstance(data: any): SignerDTO {
        return new SignerDTO(data);
    }
}
