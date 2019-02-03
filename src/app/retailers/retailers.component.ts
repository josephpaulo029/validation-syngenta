import { element } from 'protractor';
import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
// import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { stat } from 'fs';
import { DatePipe } from '@angular/common';
import { RetailersApprovedTableComponent } from './retailers-approved-table/retailers-approved-table.component';
import { RetailersPendingTableComponent } from './retailers-pending-table/retailers-pending-table.component';
import { RetailersDeniedTableComponent } from './retailers-denied-table/retailers-denied-table.component';
@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {
  @ViewChild('pendingTbl') pendingTbl: RetailersPendingTableComponent;
  @ViewChild('appovedTbl') appovedTbl: RetailersApprovedTableComponent;
  @ViewChild('deniedTbl') deniedTbl: RetailersDeniedTableComponent;
  pipe = new DatePipe('en-US'); // Use your own locale
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pendingActive: boolean;
  approvedActive: boolean;
  deniedActive: boolean;
  viewDataActive: boolean;
  viewData: any;
  retailersData: any;
  pendingRetailersData: any;
  approveRetailersData: any;
  deniedRetailersData: any;
  @Output() pendingLength = new EventEmitter<any>();
  @Output() approveLength = new EventEmitter<any>();
  @Output() deniedlength = new EventEmitter<any>();
  closeResult: string;
  modalHeader: any;
  totalGross: any = 0;
  @Input() dashboard: boolean;
  dashboardSelect: any;
  routerParams: any;
  attachedImg: any;
  activeHref: any;
  dateVal: any;
  errMsg: any;
  selectedDistributor: any;
  distributorList = [
    { id: 1, name: 'Distributor 1' },
    { id: 2, name: 'Distributor 2' },
    { id: 3, name: 'Distributor 3' },
  ];

  sampleData = [{
    "id": 3,
    "receipt_number": "test3",
    "receipt_photo": "https://www.qb-enterprise.com/syngenta/static/images/avatar5.png",
    "remarks": "",
    "products": [
      {
        "id": 1,
        "quantity": 14
      }
    ],
    "grower": 1,
    "created": "2019-01-12T06:29:54.228103Z",
    "modified": "2019-01-12T06:29:54.228322Z",
    "type": "claim",
    "points": 84,
    "status": 2
  }];
  dateFrom: any;
  dateTo: any;
  status1: any;

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.defaultnavStatus();
    let lastweek = new Date();
    lastweek.setDate(lastweek.getDate() - 7)
    this.dateFrom = lastweek;
    this.dateTo = Date.now();
    this.validationService.getFrom = this.pipe.transform(this.dateFrom, 'shortDate');
    this.validationService.getTo = this.pipe.transform(this.dateTo, 'shortDate');

    // console.log(this.validationService.getTabStatus);
    switch (this.validationService.getTabStatus) {
      case 2:
        this.clickPending();
        document.getElementById('pendingBtn').click();
        // console.log(this.activeHref);
        break;
      case 3:
        this.clickApproved();
        document.getElementById('approvedBtn').click();
        // console.log(this.activeHref);
        break;
      case 4:
        this.clickDenied();
        document.getElementById('deniedBtn').click();
        // console.log(this.activeHref);
        break;

      default:
        this.clickPending();
        // console.log(this.activeHref);

        break;
    }
    this.routerParams = this.route.queryParams.subscribe(params => {
      // console.log(params);
      // Defaults to 0 if no query param provided.
      this.viewData = this.validationService.getSelectedData;
      // console.log(this.validationService.getSelectedData);
      if (this.viewData != undefined) {
        this.dashboardSelect = this.viewData.onselect || false;
        this.attachedImg = this.viewData.receipt_photo;
        // console.log(this.dashboardSelect);
        this.defaultnavStatus();
        this.viewDataActive = true;
        if (this.dashboard) {
          // console.log(this.dashboard);

          this.defaultnavStatus();
          this.pendingActive = true;
          this.validationService.getSelectedData = undefined;
        }
      }
      if (this.dashboard) {
        // console.log(this.dashboard);
        this.validationService.getTabStatus = undefined;
        this.clickPending();
      }
      if (!this.dashboard && !this.viewData) {
        // console.log(this.dashboard);

        this.defaultnavStatus();
        this.pendingActive = true;
      }
    });
    this.loadPending();
    this.loadApproved();
    this.loadDenied();
    // console.log(this.dashboard);
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  ngOnDestroy() {
    // this.routerParams.unsubscribe();
  }

  getDate(type: string, event: MatDatepickerInputEvent<Date>) {
    switch (type) {
      case 'change':
        this.dateVal = event.value;
        break;

      case 'from':
        this.dateFrom = event.value;
        this.validationService.getFrom = this.pipe.transform(this.dateFrom, 'shortDate');
        this.reloadTbl();
        // console.log(this.validationService.getFrom);
        break;

      case 'to':
        this.dateTo = event.value;
        this.validationService.getTo = this.pipe.transform(this.dateTo, 'shortDate');
        this.reloadTbl();
        // console.log(this.validationService.getTo);
        break;

      default:
        break;
    }
    // console.log(this.dateVal);
    // console.log(event);
  }

  reloadTbl() {
    this.pendingTbl.loadPending();
    this.appovedTbl.loadApproved();
    this.deniedTbl.loadDenied();
    // console.log(this.activeHref);
    // switch (this.activeHref) {
    //   case '#pending':
    //     this.pendingTbl.loadPending();
    //     break;
    //   case '#approved':
    //     this.appovedTbl.loadApproved();
    //     break;
    //   case '#denied':
    //     this.deniedTbl.loadDenied();
    //     break;

    //   default:
    //     break;
    // }
  }

  getDistributor(event: any) {
    let distributor;
    distributor = event.target.value;
    // console.log(distributor);
    this.viewData.distributor = distributor;
  }

  loadPending() {
    Promise.resolve(this.validationService.getRetailersTrans(2))
      .then(data => {
        this.pendingRetailersData = data;
        this.pendingLength.emit(this.pendingRetailersData);

        // this.pendingRetailersData = this.sampleData;
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadApproved() {
    let data = {
      status: 3,
      type: "retailer"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.approveRetailersData = data;

        let data2 = {
          status: 1,
          type: "retailer"
        }
        Promise.resolve(this.validationService.gettransData(data2))
          .then(data => {
            this.status1 = data;
            this.status1.forEach(element => {
              this.approveRetailersData.push(element);
            });
            console.log(this.approveRetailersData);
            this.approveLength.emit(this.approveRetailersData);
            // console.log(this.approveGrowersData);
            // console.log(data);

          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadDenied() {
    let data = {
      status: 4,
      type: "retailer"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.deniedRetailersData = data;
        this.deniedlength.emit(this.deniedRetailersData);
        // console.log(this.deniedGrowersData);
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectData(info) {
    // if (!this.dashboard) {
    // console.log(info);
    this.viewDataActive = true;
    // info.receipt_photo = "/assets/img/attc.png";
    this.attachedImg = info.receipt_photo;
    this.viewData = info;
    this.distributorList.filter(data => {
      if (data.id == this.viewData.distributor) {
        this.viewData.distributor_name = data.name;
      }
    })
    // this.viewData.products.push({ id: 2, quantity: 3 , points: 2})
    // }
  }

  addAmt(prod, form: NgForm) {
    // console.log(prod)
    // console.log(form.value)
    this.viewData.products.filter(product => {
      if (product.id == prod.id) {
        product.amount = form.value.amount;
      };
    });
    this.computeGross();
    // console.log(this.viewData.products)
  }

  computeGross() {
    this.totalGross = 0;
    this.viewData.products.filter(product => {
      if (product.amount) {
        this.totalGross = parseInt(this.totalGross) + parseInt(product.amount);
        // this.totalGross = parseInt(this.totalGross) + (parseInt(product.amount) * parseInt(product.quantity));
      };
    })
  }

  approve() {
    this.viewData.newStatus = 3;
    Promise.resolve(this.validationService.retailersValidate(this.viewData))
      .then(data => {
        // this.dtTrigger.next();
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  validateData() {
    this.viewData.total_amt = this.totalGross;
    this.viewData.type = "retailer";
    this.viewData.invoicedate = this.dateVal;
    return true;
  }

  approveTrans(status) {
    // console.log(status);
    if (status) {
      this.validateData();
      this.viewData.status = 3;
      if (this.validateData()) {
        // console.log(this.viewData);
        Promise.resolve(this.validationService.retailersValidate(this.viewData))
          .then(data => {
            // console.log(data);
            // this.dtTrigger.unsubscribe();
            Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
              // console.log(data);
              // this.goBack();
              this.totalGross = 0;
              this.dateVal = undefined;
              this.selectedDistributor = 0;
            }).catch(e => {
              console.log(e);
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

    }
    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
  }

  gotoDashbard() {
    this.router.navigate(['/dashboard']);
  }

  denyTrans(form: NgForm, status) {
    this.validateData();
    // console.log(status);
    if (this.validateData()) {
      if (!status) {
        status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
        this.viewData.status = 4;
        this.viewData.total_points = 0;
        this.viewData.remarks = form.value.reason;
        Promise.resolve(this.validationService.retailersValidate(this.viewData))
          .then(data => {
            // console.log(data);
            // console.log(this.viewData);
            Promise.resolve(this.validationService.denysendSMS(this.viewData))
              .then(data => {
                Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
                  // console.log(data);
                  // this.router.navigate(['/dashboard']);
                  // this.goBack();
                  this.totalGross = 0;
                  this.dateVal = undefined;
                  this.selectedDistributor = 0;
                }).catch(e => {
                  console.log(e);
                });
              }).catch(e => {
                console.log(e);
              });
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }

  clickPending() {
    this.defaultnavStatus();
    this.pendingActive = true;
    this.activeHref = "#pending";
    this.loadPending();
  }

  clickApproved() {
    this.defaultnavStatus();
    this.approvedActive = true;
    this.activeHref = "#approved";
    this.loadApproved();
  }

  clickDenied() {
    this.defaultnavStatus();
    this.deniedActive = true;
    this.activeHref = "#denied";
    this.loadDenied();
  }

  goBack() {
    this.viewDataActive = false;
    // console.log(this.viewData.status);
    switch (this.viewData.status) {
      case 2: {
        this.clickPending();
        // console.log(this.activeHref);
        break;
      }
      case 3: {
        this.clickApproved();
        // console.log(this.activeHref);
        break;
      }
      case 4: {
        this.clickDenied();
        // console.log(this.activeHref);
        break;
      }

      default:
        break;
    }

  }

  defaultnavStatus() {
    this.pendingActive = false;
    this.approvedActive = false;
    this.deniedActive = false;
    this.viewDataActive = false;
  }
}
