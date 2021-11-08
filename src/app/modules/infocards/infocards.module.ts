import {GridModule} from '@progress/kendo-angular-grid';
import {CommonModule} from '@angular/common';
import {ButtonsModule} from '@progress/kendo-angular-buttons';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@progress/kendo-angular-layout';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {InputsModule} from '@progress/kendo-angular-inputs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationModule} from '@progress/kendo-angular-notification';

import {WebapiModule} from 'src/app/webapi/webapi.module';
import {InfocardListComponent} from './components/infocard-list/infocard-list.component';
import {InfocardEditComponent} from './components/infocard-edit/infocard-edit.component';
import {RoadSectionComponent} from './components/road-section/road-section.component';
import {DictionariesModule} from '../dictionaries/dictionaries.module';
import {RoadSectionEditService} from './services/road-section-edit.service';
import {BaseEditService} from '../dictionaries/services/base-edit.service';
import {RoadTollComponent} from './components/road-toll/road-toll.component';
import {RoadTollEditService} from './services/road-toll-edit.service';
import {RoadDateComponent} from './components/road-date/road-date.component';
import {RoadDateEditService} from './services/road-date-edit.service';
import {DocumentComponent} from './components/document/document.component';
import {DocumentEditService} from './services/document-edit.service';
import {RoadPlaceComponent} from './components/road-place/road-place.component';
import {RoadPlaceEditService} from './services/road-place.edit.service';
import {ArchiveReasonComponent} from './components/infocard-list/archive-reason.component';
import {CaseLocationComponent} from './components/infocard-edit/case-location.component';
import {CommonsModule} from '../commons/commons.module';
import {InfocardEditGuardService} from './services/infocard-edit-guard.service';
import {InfocardFieldComponent} from './components/infocard-edit/infocard-field.component';

@NgModule({
  imports: [
    CommonModule,
    WebapiModule,
    GridModule,
    ButtonsModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    DropDownsModule,
    DateInputsModule,
    ReactiveFormsModule,
    DictionariesModule,
    InputsModule,
    BrowserAnimationsModule,
    NotificationModule,
    CommonsModule
  ],
  providers: [
    BaseEditService,
    RoadSectionEditService,
    RoadDateEditService,
    RoadTollEditService,
    DocumentEditService,
    RoadPlaceEditService,
    InfocardEditGuardService
  ],
  declarations: [
    InfocardListComponent,
    InfocardEditComponent,
    RoadSectionComponent,
    RoadDateComponent,
    RoadTollComponent,
    DocumentComponent,
    RoadPlaceComponent,
    ArchiveReasonComponent,
    CaseLocationComponent,
    InfocardFieldComponent
  ],
  entryComponents: [ArchiveReasonComponent, CaseLocationComponent],
  exports: [InfocardListComponent, InfocardEditComponent]
})
export class InfocardsModule {
}
