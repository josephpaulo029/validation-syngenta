import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GrowersModule } from '../growers/growers.module';
import { RetailersModule } from '../retailers/retailers.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LayoutRoutingModule),
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    GrowersModule,
    RetailersModule,

  ],
  declarations: [
    DashboardComponent,
  ]
})
export class LayoutModule { }
