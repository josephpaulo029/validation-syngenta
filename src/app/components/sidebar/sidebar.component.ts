import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';

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
  accountInfo: any;
  timelog: any;

  constructor(private validationService: ValidationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.accountInfo = JSON.parse(localStorage.getItem('accountinfo'));
    // this.timelog = this.validationService.accountData.datetime;
    // console.log(this.accountInfo);

    // Promise.resolve(this.validationService.getaccountInfo())
    //   .then(data => {
    //     this.accountInfo = data;

    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
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
