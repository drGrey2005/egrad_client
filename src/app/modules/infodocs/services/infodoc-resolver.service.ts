import {Injectable} from '@angular/core';
import {InfodocDTO} from 'src/app/webapi/models/infodoc.dto';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {InfodocAPIService} from 'src/app/webapi/api/infodoc.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfodocResolverService implements Resolve<InfodocDTO> {

  constructor(private apiService: InfodocAPIService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<InfodocDTO> | InfodocDTO {
    if (route.params['id']) {
      return this.apiService.get(route.params['id']);
    }
    return null;
  }
}
