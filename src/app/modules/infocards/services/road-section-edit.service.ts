import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEditService } from 'src/app/modules/dictionaries/services/base-edit.service';
import { RoadSectionAPIService } from 'src/app/webapi/api/road-section.service';
import { InfocardAPIService } from 'src/app/webapi/api/infocard.service';
import { RoadSectionDTO } from 'src/app/webapi/models/road-section.dto';

@Injectable()
export class RoadSectionEditService extends BaseEditService<RoadSectionDTO> {

  constructor(private roadSectionApiService: RoadSectionAPIService, private infocardApi: InfocardAPIService) {
    super(roadSectionApiService);
  }

  protected fetch(inputArgs?: any): Observable<RoadSectionDTO[]> {
    return this.infocardApi
      .getSections(inputArgs);
  }
}
