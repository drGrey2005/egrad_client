import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEditService } from 'src/app/modules/dictionaries/services/base-edit.service';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { RoadDateDTO } from 'src/app/webapi/models/road-date.dto';
import { RoadDateAPIService } from 'src/app/webapi/api/road-date.service';

@Injectable()
export class RoadDateEditService extends BaseEditService<RoadDateDTO> {
  constructor(private roadDateApiService: RoadDateAPIService, private infocardApi: InfocardAPIService) {
    super(roadDateApiService);
  }

  protected fetch(inputArgs?: any): Observable<RoadDateDTO[]> {
    return this.infocardApi
      .getDates(inputArgs);
  }
}
