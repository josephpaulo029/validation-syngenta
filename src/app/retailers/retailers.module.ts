import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { RetailersTableComponent } from './retailers-table/retailers-table.component';
import { RetailersComponent } from './retailers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
  ],
  declarations: [
    RetailersTableComponent,
    RetailersComponent
  ],
  exports: [
    RetailersTableComponent,
    RetailersComponent
  ],
})
export class RetailersModule { }
