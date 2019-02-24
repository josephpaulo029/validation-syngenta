import { element } from 'protractor';
import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
// import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { stat } from 'fs';
import { GrowersDeniedTableComponent } from './growers-denied-table/growers-denied-table.component';
import { GrowersPendingTableComponent } from './growers-pending-table/growers-pending-table.component';
import { GrowersApprovedTableComponent } from './growers-approved-table/growers-approved-table.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-growers',
  templateUrl: './growers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers.component.css']
})
export class GrowersComponent implements OnInit {
  @ViewChild('approveBtn') apprvBtn: ElementRef;
  @ViewChild('pendingTbl') pendingTbl: GrowersPendingTableComponent;
  @ViewChild('appovedTbl') appovedTbl: GrowersApprovedTableComponent;
  @ViewChild('deniedTbl') deniedTbl: GrowersDeniedTableComponent;
  pipe = new DatePipe('en-US'); // Use your own locale
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pendingActive: boolean;
  approvedActive: boolean;
  deniedActive: boolean;
  viewDataActive: boolean;
  viewData: any;
  growersData: any;
  pendingGrowersData: any;
  approveGrowersData: any;
  deniedGrowersData: any;
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
  sampleData = [{
    "id": 3,
    "receipt_number": "test3",
    "receipt_photo": "https://www.qb-enterprise.com/syngenta/static/images/avatar5.png",
    "remarks": "",
    "products": [
      {
        "id": 1,
        "quantity": 14,
        "points": 3,
      }
    ],
    "grower": 1,
    "created": "2019-01-12T06:29:54.228103Z",
    "modified": "2019-01-12T06:29:54.228322Z",
    "type": "claim",
    "points": 84,
    "status": 2
  }];
  dateVal: any;
  dateFrom: any;
  dateTo: any;
  errMsg: any;
  amtVal: any;
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
      case 1:
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
      pagingType: 'full_numbers',
    };

  }

  ngOnDestroy() {
    // this.routerParams.unsubscribe();
  }

  downloadImage(img) {
    this.validationService.getImage(img).subscribe(
      (res) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res);
        a.download = "receipt_" + this.viewData.invoice;
        document.body.appendChild(a);
        a.click();
      });
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

  getViewData(info) {
    // console.log(info);
  }
  loadPending() {
    Promise.resolve(this.validationService.getGrowersTrans(2))
      .then(data => {
        this.pendingGrowersData = data;
        this.pendingLength.emit(this.pendingGrowersData);
        // this.pendingGrowersData = this.sampleData;
        // console.log(this.pendingGrowersData);
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  }

  loadApproved() {
    let data = {
      status: 1,
      type: "grower"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.approveGrowersData = data;
        this.approveLength.emit(this.approveGrowersData);
        // console.log(this.approveGrowersData);
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  loadDenied() {
    let data = {
      status: 4,
      type: "grower"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.deniedGrowersData = data;
        this.deniedlength.emit(this.deniedGrowersData);
        // console.log(this.deniedGrowersData);
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
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
      case 1: {
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

  selectData(info) {
    console.log(info);

    this.viewDataActive = true;
    this.attachedImg = info.receipt_photo;
    this.viewData = info;
    console.log(this.viewData);

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

  validateData() {
    // console.log(this.dateVal);
    if (!this.dateVal || !this.amountChecker()) {
      return false;
    } else {
      this.viewData.total_amt = this.totalGross;
      this.viewData.type = "grower";
      this.viewData.invoicedate = this.dateVal;
      return true;
    }
  }

  amountChecker() {
    let counter = 0;
    this.viewData.products.forEach(prod => {
      if (prod.amount == 0 || !prod.amount) {
        counter += 1
      }
    });
    // console.log(counter)
    if (counter <= 0) {
      return true
    } else {
      return false
    }
  }

  approveTrans(status) {
    // let element: HTMLElement = document.getElementById('approveBtn') as HTMLElement;
    // element.click();
    // console.log(status);
    console.log(this.viewData);

    if (status) {
      this.validateData();
      if (this.validateData()) {
        this.viewData.status = 1;
        Promise.resolve(this.validationService.getGrowerInfo(this.viewData))
          .then(data => {
            let growerInfo;
            growerInfo = data;
            this.viewData.phone_number = growerInfo.phone_number;
            // console.log(this.viewData);
            Promise.resolve(this.validationService.growersValidate(this.viewData))
              .then(data => {
                // console.log(data);
                // this.dtTrigger.unsubscribe();
                Promise.resolve(this.validationService.approvesendSMS(this.viewData))
                  .then(data => {

                    Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
                      // console.log(data);
                      // this.loadPending();
                      // this.goBack();
                      this.totalGross = 0;
                      this.dateVal = undefined;
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
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert("Please check if transaction details are already filled up.");
      }

    }
    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
  }

  gotoDashbard() {
    this.defaultnavStatus();
    this.pendingActive = true;
    // this.reloadTbl();
    // this.router.navigate(['/growers']);
  }

  denyTrans(form: NgForm, status) {
    // console.log(status);
    // if (this.validateData()) {
    if (!status) {
      status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
      this.viewData.status = 4;
      this.viewData.total_points = 0;
      this.viewData.remarks = form.value.reason;
      Promise.resolve(this.validationService.getGrowerInfo(this.viewData))
        .then(data => {
          let growerInfo;
          growerInfo = data;
          this.viewData.phone_number = growerInfo.phone_number;
          Promise.resolve(this.validationService.growersValidate(this.viewData))
            .then(data => {
              // console.log(data);
              // console.log(this.viewData);
              Promise.resolve(this.validationService.denysendSMS(this.viewData))
                .then(data => {
                  Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
                    // console.log(data);
                    // this.goBack();
                    this.totalGross = 0;
                    this.dateVal = undefined;
                  }).catch(e => {
                    console.log(e);
                  });
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
  // }

}
