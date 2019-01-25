import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
// import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-growers',
  templateUrl: './growers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers.component.css']
})
export class GrowersComponent implements OnInit {
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
  closeResult: string;
  modalHeader: any;
  totalGross: any = 0;
  @Input() dashboard: boolean;
  dashboardSelect: any;
  routerParams: any;
  attachedImg: any;
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

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) {
    // config.backdrop = 'static';
    // config.keyboard = false;
    // config.centered = true;
  }

  ngOnInit(): void {
    this.defaultnavStatus();
    this.pendingActive = true;
    this.routerParams = this.route.queryParams.subscribe(params => {
      console.log(params);
      // Defaults to 0 if no query param provided.
      this.viewData = this.validationService.getSelectedData;
      console.log(this.validationService.getSelectedData);
      if (this.viewData != undefined) {
        this.dashboardSelect = this.viewData.onselect || false;
        this.attachedImg = this.viewData.receipt_photo;
        console.log(this.dashboardSelect);
        this.defaultnavStatus();
        this.viewDataActive = true;
        if (this.dashboard) {
          console.log(this.dashboard);

          this.defaultnavStatus();
          this.pendingActive = true;
          this.validationService.getSelectedData = undefined;
        }
      }
      if (!this.dashboard && !this.viewData) {
        console.log(this.dashboard);

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
    this.routerParams.unsubscribe();
  }

  getViewData(info) {
    console.log(info);
  }
  loadPending() {
    Promise.resolve(this.validationService.getGrowersData(2))
      .then(data => {
        this.pendingGrowersData = data;
        // this.pendingGrowersData = this.sampleData;
        console.log(this.pendingGrowersData);
        // this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  }

  loadApproved() {
    Promise.resolve(this.validationService.getGrowersData(1))
      .then(data => {
        this.approveGrowersData = data;
        console.log(this.approveGrowersData);
        // this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  loadDenied() {
    Promise.resolve(this.validationService.getGrowersData(4))
      .then(data => {
        this.deniedGrowersData = data;
        console.log(this.deniedGrowersData);
        // this.dtTrigger.next();
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  clickPending() {
    this.defaultnavStatus();
    this.pendingActive = true;
    this.loadPending();
  }

  clickApproved() {
    this.defaultnavStatus();
    this.approvedActive = true;
    this.loadApproved();
  }

  clickDenied() {
    this.defaultnavStatus();
    this.deniedActive = true;
    this.loadDenied();
  }

  goBack() {
    this.viewDataActive = false;
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
    // info.receipt_photo = "/assets/img/attc.png";
    this.attachedImg = info.receipt_photo;
    this.viewData = info;
    // this.viewData.products.push({ id: 2, quantity: 3 })
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
        this.totalGross = parseInt(this.totalGross) + parseInt(product.amount)
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

  approveTrans(status) {
    this.viewData.grossSales = this.totalGross;
    this.viewData.status = 1;
    Promise.resolve(this.validationService.growersValidate(this.viewData))
      .then(data => {
        console.log(data);
        this.dtTrigger.unsubscribe();
        this.loadPending();
        Promise.resolve(this.validationService.addTrans(this.viewData))
          .then(data => {
            console.log(data);
            this.goBack();
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });

    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
  }

  denyTrans(form: NgForm, status) {
    console.log(status);
    if (!status) {
      status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
      this.viewData.status = 4;
      this.viewData.remarks = form.value.reason;
      Promise.resolve(this.validationService.growersValidate(this.viewData))
        .then(data => {
          console.log(data);
          this.dtTrigger.unsubscribe();
          this.loadPending();
          this.goBack();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

}
