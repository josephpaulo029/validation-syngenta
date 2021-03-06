import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-growers-table',
  templateUrl: './growers-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers-table.component.css']
})
export class GrowersTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() growersData: any;
  @Input() status: any;
  @Output() viewData = new EventEmitter<any>();
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.dashboard);
    switch (this.status) {
      case 'pendingActive': {
        this.loadPending();
      }
      case 'approvedActive': {
        this.loadApproved();
      }
      case 'deniedActive': {
        this.loadDenied();
      }

      default:
        break;
    }
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

  loadPending() {
    Promise.resolve(this.validationService.getGrowersTrans(2))
      .then(data => {
        this.growersData = data;
        // this.pendingLength.emit(data);
        // this.pendingGrowersData = this.sampleData;
        console.log(this.growersData);
        this.rerender();

        // this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  }

  loadApproved() {
    Promise.resolve(this.validationService.getGrowersTrans(1))
      .then(data => {
        this.growersData = data;
        // this.approveLength.emit(data);
        console.log(this.growersData);
        this.rerender();

        // this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });
  }

  loadDenied() {
    Promise.resolve(this.validationService.getGrowersTrans(4))
      .then(data => {
        this.growersData = data;
        // this.deniedlength.emit(data);
        console.log(this.growersData);
        // this.rerender();

        // this.dtTrigger.next();
        // console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  selectData(info) {
    console.log(info);
    Promise.resolve(this.validationService.getGrowerProduct(info.transid))
      .then(data => {
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

      })
      .catch(e => {
        console.log(e);
      });

    // info.onselect = true;

    // info.total_points = 0;
    // info.products.forEach(item => {
    //   info.total_points += parseInt(item.points) * parseInt(item.quantity);
    // });
    // this.viewData.emit(info);
    // if (this.dashboard) {
    //   this.validationService.getSelectedData = info;
    //   this.router.navigate(['/growers']);
    // }
  }

}
