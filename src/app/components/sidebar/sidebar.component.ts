import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/growers', title: 'Growers Reports', icon: 'supervised_user_circle', class: '' },
  { path: '/retailers', title: 'Retailer Reports', icon: 'store', class: '' },
  { path: '/login', title: 'Sign Out', icon: 'exit_to_app', class: '' },
];

@Component({
  selector: '[app-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  ngOnDestroy() {
    localStorage.removeItem('TOKEN');
  }
  
}
