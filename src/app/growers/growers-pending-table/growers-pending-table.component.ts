import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-growers-pending-table',
  templateUrl: './growers-pending-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers-pending-table.component.css']
})
export class GrowersPendingTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() growersData: any;
  @Input() status: any;
  @Output() viewData = new EventEmitter<any>();
  @Input() dashboard: boolean;
  fromDate: any;
  toDate: any;
  transDate: any;
  pipe = new DatePipe('en-US'); // Use your own locale

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.dashboard);
    this.loadPending();

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
    let fdate = new Date(this.validationService.getFrom);
    let tdate = new Date(this.validationService.getTo);
    this.fromDate = new Date(fdate.getTime());
    this.toDate = new Date(tdate.getTime() + 86399000);
    console.log(this.fromDate);
    console.log(this.toDate);

    this.growersData = data.filter((item) => {
      // this.transDate = this.pipe.transform(item.submitteddate, 'shortDate');
      this.transDate = new Date(item.submitteddate);
      console.log(this.transDate);
      return this.transDate.getTime() >= this.fromDate.getTime() &&
        this.transDate.getTime() <= this.toDate.getTime();
    });
    console.log(this.growersData);

  }

  loadPending() {

    Promise.resolve(this.validationService.getGrowersTrans(2))
      .then(data => {
        this.growersData = data;
        this.filterbyDate(this.growersData);
        this.rerender();
        // this.growersData = this.sampleData;
        console.log(this.growersData);
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  }

  selectData(info) {
    console.log(info);
    info.type = "grower";
    Promise.resolve(this.validationService.checkAvailability(info))
      .then(data => {
        // console.log(data);
        // console.log(this.validationService.accountData.id);
        let res;
        res = data;
        if (res.length == 0 || res.length != 0 && res[0].userid == localStorage.getItem('userid')) {

          let retailerid;
          retailerid = info.receipt_from.split("-")[1];
          Promise.resolve(this.validationService.getRetailerInfo(retailerid)).then(retailerInfo => {
            // console.log(retailerInfo);

            let retailer;
            retailer = retailerInfo;
            info.retailer_name = retailer.first_name + ' ' + retailer.last_name;
            info.retailer_id = retailer.id;
            info.business_name = retailer.business_name;

            Promise.resolve(this.validationService.getFieldforceInfo(retailer.fieldforce_id)).then(fforceInfo => {
              let fieldforce;
              fieldforce = fforceInfo;
              info.fieldforce_name = fieldforce.first_name + ' ' + fieldforce.last_name;
              info.fieldforce_id = fieldforce.id;
              // console.log(fieldforce);

              Promise.resolve(this.validationService.getGrowerProduct(info.transid)).then(data => {
                info.products = data;
                info.total_points = 0;
                info.products.forEach(item => {
                  info.total_points += parseInt(item.points) * parseInt(item.quantity);
                });
                info.onselect = true;
                this.viewData.emit(info);
                if (this.dashboard) {
                  this.validationService.getSelectedData = info;
                  this.router.navigate(['/growers']);
                }
                console.log(data);
                // this.dtTrigger.next();
                if (res.length == 0) {
                  Promise.resolve(this.validationService.addSelected(info))
                    .then(data => {
                      console.log(data);

                    }).catch(e => {
                      console.log(e);
                    });
                }

              }).catch(e => {
                console.log(e);
              });

            }).catch(e => {
              console.log(e);
            });

          }).catch(e => {
            console.log(e);
          });


        } else {
          alert('Transaction already handled by other staff');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

}
