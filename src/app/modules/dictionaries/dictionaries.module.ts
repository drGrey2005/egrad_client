import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebapiModule } from 'src/app/webapi/webapi.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KmAndMDirective } from './directives/km-and-m.directive';
import { RoadLengthPipe } from './pipes/road-length.pipe';
import { KmAndMConverter } from './services/km-and-m.converter';
import { OktmoTreeComponent } from './components/oktmo-tree/oktmo-tree.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { OktmoEditorComponent } from './components/oktmo-editor/oktmo-editor.component';
import { OktmoValuesFormattedPipe } from './pipes/oktmo-values-formatted.pipe';
import { RegionDropdownComponent } from './components/region-dropdown/region-dropdown.component';
import { RoadImportanceFormattedPipe } from './pipes/road-importance-formatted.pipe';
import { DocPreviewComponent } from './components/doc-preview/doc-preview.component';
import { UsersFormattedPipe } from './pipes/users-formatted.pipe';
import { EgradRowEditingDirective } from './directives/egrad-row-editing.directive';
import { InfocardGridComponent } from './components/infocard-grid/infocard-grid.component';
import {GridModule, ExcelModule, BodyModule} from '@progress/kendo-angular-grid';
import { CommonsModule } from '../commons/commons.module';
import { PublicRoadsFormattedPipe } from './pipes/public-roads-formatted.pipe';
import { InfocardPartComponent } from './components/infocard-part/infocard-part.component';
import { RegionFormattedPipe } from './pipes/region-formatted.pipe';
import { ActionLogOperationsFormattedPipe } from './pipes/action-log-operations.pipe';
import { ActionLogTypesFormattedPipe } from './pipes/action-log-types.pipe';

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    WebapiModule,
    DropDownsModule,
    FormsModule,
    TreeViewModule,
    DialogModule,
    DialogsModule,
    ButtonsModule,
    ReactiveFormsModule,
    GridModule,
    ExcelModule,
    BodyModule,
  ],
  entryComponents: [OktmoTreeComponent, DocPreviewComponent, InfocardGridComponent, InfocardPartComponent],
  declarations: [
    KmAndMDirective,
    RoadLengthPipe,
    OktmoTreeComponent,
    OktmoEditorComponent,
    OktmoValuesFormattedPipe,
    RegionDropdownComponent,
    RoadImportanceFormattedPipe,
    DocPreviewComponent,
    UsersFormattedPipe,
    EgradRowEditingDirective,
    InfocardGridComponent,
    PublicRoadsFormattedPipe,
    InfocardPartComponent,
    RegionFormattedPipe,
    ActionLogOperationsFormattedPipe,
    ActionLogTypesFormattedPipe,
  ],
  exports: [
    KmAndMDirective,
    RoadLengthPipe,
    OktmoTreeComponent,
    OktmoEditorComponent,
    OktmoValuesFormattedPipe,
    RegionDropdownComponent,
    RoadImportanceFormattedPipe,
    DocPreviewComponent,
    UsersFormattedPipe,
    EgradRowEditingDirective,
    InfocardGridComponent,
    PublicRoadsFormattedPipe,
    InfocardPartComponent,
    RegionFormattedPipe,
    ActionLogOperationsFormattedPipe,
    ActionLogTypesFormattedPipe,
  ],
  providers: [KmAndMConverter, OktmoValuesFormattedPipe]
})
export class DictionariesModule {
}
