import {Inject, Injectable, Optional} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {DatePipe} from "@angular/common";
import {BASE_PATH} from "../variables";
import {ReportTemplateDTO} from "../models/report-template.dto";

@Injectable()
export class ReportTemplateAPIService extends BaseService<ReportTemplateDTO> {
    constructor(protected http: HttpClient, protected authService: AuthenticationService, protected datePipe: DatePipe,
        @Optional() @Inject(BASE_PATH) basePath: string) {
        super(http, 'api/report/', authService, datePipe, basePath);
    }

    public export(reportId: number, data: any){
      const headers = this.getHeaders();
      headers['Content-Type'] = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return this.http
        .post(`${this.endpointUrl}${reportId}/export/`, data, { headers: headers, responseType: 'arraybuffer' });
    }

    public getInstance(data: any): ReportTemplateDTO {
        return new ReportTemplateDTO(data);
    }
}
