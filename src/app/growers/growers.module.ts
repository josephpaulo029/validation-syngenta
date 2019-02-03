import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowersTableComponent } from './growers-table/growers-table.component';
import { GrowersComponent } from './growers.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { GrowersPendingTableComponent } from './growers-pending-table/growers-pending-table.component';
import { GrowersApprovedTableComponent } from './growers-approved-table/growers-approved-table.component';
import { GrowersDeniedTableComponent } from './growers-denied-table/growers-denied-table.component';
import { CsvModule } from '@ctrl/ngx-csv';
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
  ],
  declarations: [
    GrowersTableComponent,
    GrowersComponent,
    GrowersPendingTableComponent,
    GrowersApprovedTableComponent,
    GrowersDeniedTableComponent,
  ],
  exports: [
    GrowersComponent,
    GrowersTableComponent,
    GrowersPendingTableComponent,
    GrowersApprovedTableComponent,
    GrowersDeniedTableComponent,
  ],
})
export class GrowersModule { }
