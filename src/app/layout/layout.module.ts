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
import { GrowersComponent } from '../growers/growers.component';
import { RetailersComponent } from '../retailers/retailers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LayoutRoutingModule),
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    GrowersComponent,
    RetailersComponent,
  ]
})
export class LayoutModule { }
