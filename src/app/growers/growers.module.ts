import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowersTableComponent } from './growers-table/growers-table.component';
import { GrowersComponent } from './growers.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
  ],
  declarations: [
    GrowersTableComponent,
    GrowersComponent
  ],
  exports: [
    GrowersComponent,
    GrowersTableComponent
  ],
})
export class GrowersModule { }
