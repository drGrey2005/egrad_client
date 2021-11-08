import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {ReportTemplateAPIService} from 'src/app/webapi/api/report-template.service';

@Injectable({
  providedIn: 'root'
})
export class ReportPreviewResolverService implements Resolve<string> {

  constructor(private apiService: ReportTemplateAPIService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const rp = Object.assign({}, route.queryParams);
    rp.format = 'html';

    return this.apiService.export(rp.report_id, rp).pipe(
      map(data => {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(data);
      }));
  }
}
