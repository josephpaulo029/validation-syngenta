import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GrowersComponent } from '../growers/growers.component';
import { RetailersComponent } from '../retailers/retailers.component';
import { NeedAuthGuardService } from '../services/need-auth-guard.service';

export const LayoutRoutingModule: Routes = [

  { path: 'dashboard', component: DashboardComponent, canActivate: [NeedAuthGuardService] },
  { path: 'growers', component: GrowersComponent, canActivate: [NeedAuthGuardService] },
  { path: 'retailers', component: RetailersComponent, canActivate: [NeedAuthGuardService] },

];