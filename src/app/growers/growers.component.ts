import { element } from 'protractor';
import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
// import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { stat } from 'fs';
@Component({
  selector: 'app-growers',
  templateUrl: './growers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers.component.css']
})
export class GrowersComponent implements OnInit {
  @ViewChild('approveBtn') apprvBtn: ElementRef;

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
  errMsg: any;

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.defaultnavStatus();
    this.pendingActive = true;
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

  getDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateVal = event.value;
    console.log(this.dateVal);
    console.log(event);
  }

  getViewData(info) {
    console.log(info);
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
    console.log(this.viewData.status);
    switch (this.viewData.status) {
      case 2: {
        this.clickPending();
        console.log(this.activeHref);
        break;
      }
      case 1: {
        this.clickApproved();
        console.log(this.activeHref);
        break;
      }
      case 4: {
        this.clickDenied();
        console.log(this.activeHref);
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
    // if (!this.dashboard) {
    // console.log(info);
    this.viewDataActive = true;
    // info.receipt_photo = "";
    this.attachedImg = info.receipt_photo;
    this.viewData = info;
    console.log(this.viewData);
    // this.viewData.products.push({ id: 2, quantity: 3, points: 5 })
    // }
  }

  addAmt(prod, form: NgForm) {
    console.log(prod)
    console.log(form.value)
    this.viewData.products.filter(product => {
      if (product.id == prod.id) {
        product.amount = form.value.amount;
      };
    });
    this.computeGross();
    console.log(this.viewData.products)
  }

  computeGross() {
    this.totalGross = 0;
    this.viewData.products.filter(product => {
      if (product.amount) {
        this.totalGross = parseInt(this.totalGross) + (parseInt(product.amount) * parseInt(product.quantity));
      };
    })
  }

  approve() {
    Promise.resolve(this.validationService.growersValidate(1))
      .then(data => {
        // this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  validateData() {
    this.viewData.total_amt = this.totalGross;
    this.viewData.type = "grower";
    this.viewData.invoicedate = this.dateVal;
    return true;
  }

  approveTrans(status) {
    // let element: HTMLElement = document.getElementById('approveBtn') as HTMLElement;
    // element.click();
    console.log(status);
    if (status) {
      this.validateData();
      this.viewData.status = 1;
      if (this.validateData()) {
        console.log(this.viewData);
        // Promise.resolve(this.validationService.growersValidate(this.viewData))
        //   .then(data => {
        //     console.log(data);
        //     // this.dtTrigger.unsubscribe();
        //     this.loadPending();
        Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
          console.log(data);
          this.goBack();
          this.dateVal = undefined;
        }).catch(e => {
          console.log(e);
        });
        // })
        // .catch(e => {
        //   console.log(e);
        // });
      }

    }
    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
  }

  denyTrans(form: NgForm, status) {
    this.validateData();
    console.log(status);
    if (this.validateData()) {
      if (!status) {
        status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
        this.viewData.status = 4;
        this.viewData.total_points = 0;
        this.viewData.remarks = form.value.reason;
        // Promise.resolve(this.validationService.growersValidate(this.viewData))
        //   .then(data => {
        //     console.log(data);
        console.log( this.viewData);
        Promise.resolve(this.validationService.addTransDetails(this.viewData)).then(data => {
          console.log(data);
          this.goBack();
          this.dateVal = undefined;
        }).catch(e => {
          console.log(e);
        });
        // })
        // .catch(e => {
        //   console.log(e);
        // });
      }
    }
  }

}
