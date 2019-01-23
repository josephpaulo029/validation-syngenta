import { Component, OnInit } from '@angular/core';
import { ValidationService } from './../services/validation.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  growersData: any;
  retailersData: any;
  dashboardStatus: boolean;
  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    this.loadGrowersData();
    this.loadRetailersData();
    this.dashboardStatus = true;
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  loadGrowersData() {
    Promise.resolve(this.validationService.getGrowersData(2))
      .then(data => {
        this.growersData = data;
        this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadRetailersData() {
    Promise.resolve(this.validationService.getRetailersData(2))
      .then(data => {
        this.retailersData = data;
        this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

}
