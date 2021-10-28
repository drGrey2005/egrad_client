import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMigrationComponent } from './data-migration.component';
import { RouterModule } from '@angular/router';
import { ngfModule } from 'angular-file';

const routing = RouterModule.forChild([
  { path: '**', component: DataMigrationComponent }
]);

@NgModule({
  imports: [
    CommonModule,
    ngfModule,
    routing
  ],
  declarations: [DataMigrationComponent]
})
export class DataExchangeModule { }
