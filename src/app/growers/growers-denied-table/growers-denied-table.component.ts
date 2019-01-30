import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-growers-denied-table',
  templateUrl: './growers-denied-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers-denied-table.component.css']
})
export class GrowersDeniedTableComponent implements OnInit {
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

  loadDenied() {
    let data = {
      status: 4,
      type: "grower"
    }
    Promise.resolve(this.validationService.gettransData(data))
      .then(data => {
        this.growersData = data;
        this.rerender();

        // this.deniedlength.emit(data);
        console.log(this.growersData);
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
    retailerid = info.retailer.split("-")[1];
    Promise.resolve(this.validationService.getRetailerInfo(retailerid)).then(retailerInfo => {
      console.log(retailerInfo);

      let retailer;
      retailer = retailerInfo;
      info.retailer_name = retailer.first_name + ' ' + retailer.last_name;
      info.retailer_id = retailer.id;

      Promise.resolve(this.validationService.getFieldforceInfo(retailer.fieldforce_id)).then(fforceInfo => {
        let fieldforce;
        fieldforce = fforceInfo;
        info.fieldforce_name = fieldforce.first_name + ' ' + fieldforce.last_name;
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
          this.router.navigate(['/growers']);
        }


      }).catch(e => {
        console.log(e);
      });

    }).catch(e => {
      console.log(e);
    });
  }

}
