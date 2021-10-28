import { Injectable } from '@angular/core';
import { BaseEditService } from 'src/app/modules/dictionaries/services/base-edit.service';
import { Observable } from 'rxjs';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { RoadTollAPIService } from 'src/app/webapi/api/road-toll.service';
import { RoadTollDTO } from 'src/app/webapi/models/road-toll.dto';

@Injectable()
export class RoadTollEditService extends BaseEditService<RoadTollDTO> {
  constructor(private roadTollApiService: RoadTollAPIService, private infocardApi: InfocardAPIService) {
    super(roadTollApiService);
  }

  protected fetch(inputArgs?: any): Observable<RoadTollDTO[]> {
    return this.infocardApi.getTolls(inputArgs);
  }
}
