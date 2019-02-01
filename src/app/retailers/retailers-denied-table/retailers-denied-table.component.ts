import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-retailers-denied-table',
  templateUrl: './retailers-denied-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./retailers-denied-table.component.css']
})
export class RetailersDeniedTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() retailersData: any;
  @Input() status: any;
  @Output() viewData = new EventEmitter<any>();
  @Input() dashboard: boolean;
  fromDate: any;
  toDate: any;
  pipe = new DatePipe('en-US'); // Use your own locale

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.dashboard);
    this.loadDenied();

    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  filterbyDate(data) {
    this.fromDate = this.validationService.getFrom;
    this.toDate = this.validationService.getTo;
    console.log(this.fromDate);
    console.log(this.toDate);

    this.retailersData = data.filter((item: any) => {
      let transDate = this.pipe.transform(item.submitteddate, 'shortDate');
      console.log(transDate);
      return transDate >= this.fromDate &&
        transDate <= this.toDate;
    });
  }

  loadDenied() {
    let data = {
      status: 4,
      type: "retailer"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.retailersData = data;
        this.filterbyDate(this.retailersData);
        this.rerender();

        // this.approveLength.emit(data);
        console.log(this.retailersData);
        // this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  selectData(info) {
    console.log(info);
    let retailerid;
    retailerid = info.userid;
    Promise.resolve(this.validationService.getRetailerInfo(retailerid)).then(retailerInfo => {
      console.log(retailerInfo);

      let retailer;
      retailer = retailerInfo;
      info.retailer_name = retailer.first_name + ' ' + retailer.middle_name + ' ' + retailer.last_name;
      info.retailer_id = retailer.id;

      Promise.resolve(this.validationService.getFieldforceInfo(retailer.fieldforce_id)).then(fforceInfo => {
        let fieldforce;
        fieldforce = fforceInfo;
        info.fieldforce = fieldforce.first_name + ' ' + fieldforce.middle_name + ' ' + fieldforce.last_name;
        info.fieldforce_id = fieldforce.id;
        console.log(fieldforce);

        info.products = JSON.parse(info.products);
        info.total_points = 0;
        // info.products.forEach(item => {
        //   info.total_points += parseInt(item.points) * parseInt(item.quantity);
        // });
        info.onselect = true;
        this.viewData.emit(info);
        if (this.dashboard) {
          this.validationService.getSelectedData = info;
          this.router.navigate(['/retailers']);
        }


      }).catch(e => {
        console.log(e);
      });

    }).catch(e => {
      console.log(e);
    });
  }

}
