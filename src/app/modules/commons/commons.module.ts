import getCadespluginAPI from 'async-cadesplugin';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ValidationMessageForDirective } from './directives/required-message-for.directive';

@NgModule({
  imports: [
    CommonModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonsModule,
    GridModule
  ],
  declarations: [
    DropdownFilterComponent,
    SigninComponent,
    ValidationMessageForDirective
  ],
  entryComponents: [SigninComponent],
  exports: [
    DropdownFilterComponent,
    SigninComponent,
    ValidationMessageForDirective
  ]
})
export class CommonsModule { }
