import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {InfocardAPIService} from './api/infocard.service';
import {UserAPIService} from './api/user.service';
import {OktmoAPIService} from './api/oktmo.service';
import {RoadSectionAPIService} from './api/road-section.service';
import {RoadDateAPIService} from './api/road-date.service';
import {RoadTollAPIService} from './api/road-toll.service';
import {DatePipe} from '@angular/common';
import {DocumentAPIService} from './api/document.service';
import {RegionAPIService} from './api/region.service';
import {ReportAPIService} from './api/report.api';
import {RoadOwnerAPIService} from './api/road-onwer.service';
import {InfodocAPIService} from './api/infodoc.service';
import {InfodocSignerAPIService} from './api/infodoc-signer.service';
import {FederalRoadAPIService} from './api/federal-road.service';
import {RoadPlaceAPIService} from './api/road-place.service';
import {ActionLogAPIService} from './api/action-log.service';
import {ColorIndicatorAPIService} from './api/color-indicator.service';
import {ReportTemplateAPIService} from './api/report-template.service';

@NgModule({
  providers: [
    InfocardAPIService,
    RoadSectionAPIService,
    RoadDateAPIService,
    RoadTollAPIService,
    DocumentAPIService,
    UserAPIService,
    OktmoAPIService,
    RegionAPIService,
    DatePipe,
    ReportAPIService,
    RoadOwnerAPIService,
    InfodocAPIService,
    InfodocSignerAPIService,
    FederalRoadAPIService,
    RoadPlaceAPIService,
    ActionLogAPIService,
    ColorIndicatorAPIService,
    ReportTemplateAPIService,
  ],
  imports: [
    HttpClientModule,
  ]
})

export class WebapiModule {
}
