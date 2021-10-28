import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfodocListComponent } from './components/infodoc-list/infodoc-list.component';
import { WebapiModule } from 'src/app/webapi/webapi.module';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DictionariesModule } from '../dictionaries/dictionaries.module';
import { InfodocEditComponent } from './components/infodoc-edit/infodoc-edit.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    WebapiModule,
    GridModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DictionariesModule,
    DropDownsModule,
    DateInputsModule,
    ExcelModule,
  ],
  declarations: [InfodocListComponent, InfodocEditComponent],
  exports: [InfodocListComponent]
})
export class InfodocsModule { }
