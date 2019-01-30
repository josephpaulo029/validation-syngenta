import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../services/validation.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  growerPending: any;
  growerApproved: any;
  growerDenied: any;
  retailersData: any;
  dashboardStatus: boolean;
  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    this.dashboardStatus = true;
  }

  getLength(status, data) {
    console.log(data);
    console.log(status);
    switch (status) {
      case 2: {
        this.growerPending = data.length;
        console.log(this.growerPending);
        break;
      }
      case 1: {
        this.growerApproved = data.length;
        console.log(this.growerApproved);
        break;
      }
      case 4: {
        this.growerDenied = data.length;
        console.log(this.growerDenied);
        break;
      }

        break;
    }

  }

}
