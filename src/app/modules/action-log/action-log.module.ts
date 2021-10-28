import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActionLogComponent } from './components/action-log.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonsModule } from "src/app/modules/commons/commons.module";
import { DictionariesModule } from "src/app/modules/dictionaries/dictionaries.module";

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    RouterModule,
    CommonsModule,
    DictionariesModule,
  ],
  declarations: [ActionLogComponent],
  providers: []
})
export class ActionLogModule { }
