import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GrowersComponent } from '../growers/growers.component';
import { RetailersComponent } from '../retailers/retailers.component';

export const LayoutRoutingModule: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'growers', component: GrowersComponent },
  { path: 'retailers', component: RetailersComponent },

];