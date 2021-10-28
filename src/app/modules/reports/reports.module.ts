import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { WebapiModule } from 'src/app/webapi/webapi.module';
import { ReportPreviewComponent } from './components/report-preview.component';
import { ReportListComponent } from './components/report-list.component';
import { GenerateReportComponent } from './components/generate-report.component';

@NgModule({
  imports: [
    CommonModule,
    WebapiModule,
    GridModule,
    DialogModule,
    FormsModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    ButtonsModule
  ],
  declarations: [
    ReportListComponent,
    GenerateReportComponent,
    ReportPreviewComponent,
  ],
  entryComponents: [
    GenerateReportComponent,
  ],
})
export class ReportsModule { }
