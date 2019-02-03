import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../services/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  growerPending: any;
  growerApproved: any;
  growerDenied: any;
  retailerPending: any;
  retailerApproved: any;
  retailerDenied: any;
  dashboardStatus: boolean;
  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.dashboardStatus = true;
    // console.log(localStorage.getItem('TOKEN') != null);
    // console.log(localStorage.getItem('userid'));
  }

  gotoPage(page, status) {
    this.validationService.getTabStatus = status;
    this.router.navigate([page]);

  }

  getLength_Grower(status, data) {
    // console.log(data);
    // console.log(status);
    switch (status) {
      case 2: {
        this.growerPending = data.length;
        // console.log(this.growerPending);
        break;
      }
      case 1: {
        this.growerApproved = data.length;
        // console.log(this.growerApproved);
        break;
      }
      case 4: {
        this.growerDenied = data.length;
        // console.log(this.growerDenied);
        break;
      }

        break;
    }

  }

  getLength_Retailer(status, data) {
    // console.log(data);
    // console.log(status);
    switch (status) {
      case 2: {
        this.retailerPending = data.length;
        // console.log(this.retailerPending);
        break;
      }
      case 3: {
        this.retailerApproved = data.length;
        // console.log(this.retailerApproved);
        break;
      }
      case 4: {
        this.retailerDenied = data.length;
        // console.log(this.retailerDenied);
        break;
      }

        break;
    }

  }

}
