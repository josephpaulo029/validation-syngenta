import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { RetailersTableComponent } from './retailers-table/retailers-table.component';
import { RetailersComponent } from './retailers.component';
import { RetailersPendingTableComponent } from './retailers-pending-table/retailers-pending-table.component';
import { RetailersApprovedTableComponent } from './retailers-approved-table/retailers-approved-table.component';
import { RetailersDeniedTableComponent } from './retailers-denied-table/retailers-denied-table.component';
import { CsvModule } from '@ctrl/ngx-csv';
import { CurrencyMaskModule } from "ng2-currency-mask";

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CsvModule,
    CurrencyMaskModule
  ],
  declarations: [
    RetailersTableComponent,
    RetailersComponent,
    RetailersPendingTableComponent,
    RetailersApprovedTableComponent,
    RetailersDeniedTableComponent
  ],
  exports: [
    RetailersTableComponent,
    RetailersComponent,
    RetailersPendingTableComponent,
    RetailersApprovedTableComponent,
    RetailersDeniedTableComponent
  ],
})
export class RetailersModule { }
