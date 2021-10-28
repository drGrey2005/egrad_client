import { Injectable } from '@angular/core';
import { BaseEditService } from 'src/app/modules/dictionaries/services/base-edit.service';
import { Observable } from 'rxjs';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { RoadPlaceDTO } from "src/app/webapi/models/road-place.dto";
import { RoadPlaceAPIService } from "src/app/webapi/api/road-place.service";

@Injectable()
export class RoadPlaceEditService extends BaseEditService<RoadPlaceDTO> {
  constructor(private roadTollApiService: RoadPlaceAPIService, private infocardApi: InfocardAPIService) {
    super(roadTollApiService);
  }

  protected fetch(inputArgs?: any): Observable<RoadPlaceDTO[]> {
    return this.infocardApi.getPlaces(inputArgs);
  }
}
