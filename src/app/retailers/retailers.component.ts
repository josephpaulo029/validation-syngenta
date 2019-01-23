import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
// import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {
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
  closeResult: string;
  modalHeader: any;
  totalGross: any = 0;
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService) {

  }

  ngOnInit(): void {
    this.loadPending();
    this.loadApproved();
    this.loadDenied();
    this.defaultnavStatus();
    this.pendingActive = true;
    console.log(this.pendingActive);

    if (this.dashboard == undefined) {
      this.dashboard = false;
    }
    // console.log(this.dashboard);
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  loadPending() {
    Promise.resolve(this.validationService.getRetailersData(2))
      .then(data => {
        this.pendingRetailersData = data;
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadApproved() {
    Promise.resolve(this.validationService.getRetailersData(3))
      .then(data => {
        this.approveRetailersData = data;
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  loadDenied() {
    Promise.resolve(this.validationService.getRetailersData(4))
      .then(data => {
        this.deniedRetailersData = data;
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectData(info) {
    if (!this.dashboard) {
      console.log(info);
      this.viewDataActive = true;
      // info.attachment = "/assets/images/attc.png"
      this.viewData = info;
    }
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
    this.viewData.newStatus = 3;
    Promise.resolve(this.validationService.retailersValidate(this.viewData))
      .then(data => {
        // this.dtTrigger.next();
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  approveTrans(content, status) {
    this.viewData.grossSales = this.totalGross;
    this.viewData.status = 3;
    Promise.resolve(this.validationService.retailersValidate(this.viewData))
      .then(data => {
        console.log(data);
        this.dtTrigger.unsubscribe();
        this.loadPending();
        Promise.resolve(this.validationService.addTrans(this.viewData))
          .then(data => {
            console.log(data);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });


    status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'darkModal' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   this.goBack();
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  denyTrans(content, form: NgForm, status) {
    console.log(status);
    if (status == false) {
      status ? this.modalHeader = "APPROVED" : this.modalHeader = "DENIED";
      this.viewData.status = 4;
      this.viewData.remarks = form.value.reason;
      Promise.resolve(this.validationService.growersValidate(this.viewData))
        .then(data => {
          console.log(data);
          this.dtTrigger.unsubscribe();
          this.loadPending();
        })
        .catch(e => {
          console.log(e);
        });
    }
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'darkModal' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   if (status == false) {
    //     this.goBack();
    //   }
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  viewAttachment(content) {
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'transparent' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  clickPending() {
    this.defaultnavStatus();
    this.pendingActive = true;
    console.log(this.pendingActive);
  }

  clickApproved() {
    this.defaultnavStatus();
    this.approvedActive = true;
  }

  clickDenied() {
    this.defaultnavStatus();
    this.deniedActive = true;
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
}
