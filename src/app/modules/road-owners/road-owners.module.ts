import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadOwnerListComponent } from './components/road-owner-list/road-owner-list.component';
import { CommonsModule } from '../commons/commons.module';
import { WebapiModule } from 'src/app/webapi/webapi.module';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RouterModule } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DictionariesModule } from '../dictionaries/dictionaries.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { RoadOwnerEditComponent } from './components/road-owner-edit/road-owner-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
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
    ExcelModule
  ],
  declarations: [RoadOwnerListComponent, RoadOwnerEditComponent],
  exports: [RoadOwnerListComponent, RoadOwnerEditComponent]
})
export class RoadOwnersModule { }
