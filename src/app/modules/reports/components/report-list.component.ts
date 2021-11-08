import {Component, OnInit} from '@angular/core';
import {ReportTemplateAPIService} from '../../../webapi/api/report-template.service';
import {ReportTemplateDTO} from '../../../webapi/models/report-template.dto';
import {DialogService} from '@progress/kendo-angular-dialog';
import {GenerateReportComponent} from './generate-report.component';
import {Router} from '@angular/router';
import {OrganizationDTO} from 'src/app/webapi/models/organization.dto';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: []
})
export class ReportListComponent implements OnInit {
  public data: ReportTemplateDTO[] = [];

  constructor(
    private apiService: ReportTemplateAPIService,
    private dialogService: DialogService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.apiService.list().subscribe(data => {
      this.data = data.sort(sortByName);
    });
  }

  public generateReport(item) {
    const dialog = this.dialogService.open({
      title: 'Параметры генерации',
      content: GenerateReportComponent,
      actions: [
        {text: 'Отмена', dialogResult: 'Cancel'},
        {text: 'Сгенерировать', primary: true, dialogResult: 'OK'}
      ],
      width: 650,
      height: 450,
    });
    dialog.content.instance.enabled_params = item.params;

    dialog.result.subscribe(async result => {
      if ((<any>result).dialogResult === 'OK') {
        const params = (dialog.content.instance as GenerateReportComponent).params;
        this.prepareParams(params, item.id, item.report_name, 'html');

        this.router.navigate(['/reports', 'preview'], {queryParams: params});
      }
    });
  }

  private prepareParams(params: any, reportId: number, reportName: string, format: string) {
    params['report_name'] = reportName;
    params['report_id'] = reportId;
    params['format'] = format;

    const fromDate = params['enter_date_from'];
    const toDate = params['enter_date_to'];
    const owners = params['owners'];
    const users = params['users'];
    const subjects = params['subjects'];
    const payment_flag = params['payment_flag'];
    const signer = params['signer'];
    const request_organization = params['request_organization'];
    const org_fullname = params['org_fullname'];
    const data = params['data'];

    if (fromDate) {
      params['enter_date_from'] = new Date(fromDate.getTime() - (fromDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    }
    if (toDate) {
      params['enter_date_to'] = new Date(toDate.getTime() - (toDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    }
    if (owners) {
      params['owners'] = owners >= 0 ? String(owners) : '';
    }
    if (users) {
      params['users'] = users >= 0 ? String(users) : '';
    }
    if (subjects) {
      params['subjects'] = subjects >= 0 ? String(subjects) : '';
    }
    if (payment_flag != null) {
      params['payment_flag'] = String(payment_flag);
    }
    if (signer) {
      params['signer'] = signer >= 0 ? String(signer) : '';
    }
    this.prepareStringParam(params, 'request_organization');
    this.prepareStringParam(params, 'user_fullname');
    this.prepareStringParam(params, 'data');
    if (org_fullname) {
      if (org_fullname === OrganizationDTO.EmptyName) {
        params['org_fullname'] = '';
      } else {
        this.prepareStringParam(params, 'org_fullname');
      }
    }
  }

  private prepareStringParam(params: any, paramName: string): void {
    const val = params[paramName];
    if (val) {
      params[paramName] = encodeURI('%' + val + '%');
    }
  }
}

function sortByName(o1: ReportTemplateDTO, o2: ReportTemplateDTO): number {
  if (o1.name < o2.name) {
    return -1;
  }
  if (o1.name > o2.name) {
    return 1;
  }
  return 0;
}
