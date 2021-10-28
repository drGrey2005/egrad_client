import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { InfocardResolved } from 'src/app/webapi/models/infocard.dto';
import { Observable, of } from 'rxjs';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfocardResolverService implements Resolve<InfocardResolved> {

  constructor(private apiService: InfocardAPIService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<InfocardResolved> {
    const id = route.params['id'];
    if (isNaN(+id)) {
      const message = `Некорректный идентификатор инфокарты: ${id}`;
      console.error(message);
      return of({ infocard: null, error: message });
    }

    return this.apiService.get(id).pipe(
      map(ic => ({ infocard: ic })),
      catchError(error => {
        const message = `Ошибка запроса: ${error.error.detail}`;
        console.error(message);
        return of({ infocard: null, error: message });
      })
    );
  }
}
