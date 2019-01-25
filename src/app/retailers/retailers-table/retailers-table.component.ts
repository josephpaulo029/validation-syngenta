import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-retailers-table',
  templateUrl: './retailers-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./retailers-table.component.css']
})
export class RetailersTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() retailersData: any;
  @Input() status: any;
  @Output() viewData = new EventEmitter<any>();
  @Input() dashboard: boolean;

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.dashboard);
    this.loadPending();

    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  loadPending() {
    Promise.resolve(this.validationService.getRetailersData(2))
      .then(data => {
        // this.pendingGrowersData = data;
        // console.log(this.growersData);
        this.dtTrigger.next();
        // console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  }

  selectData(info) {
    console.log(info);
    // this.viewData = info;
    Promise.resolve(this.validationService.getRetailerProduct(info.transid))
      .then(data => {
        info.products = data;
        info.totalPoints = 0;
        info.products.forEach(item => {
          info.totalPoints += parseInt(item.points);
        });
        info.onselect = true;
        this.viewData.emit(info);
        if (this.dashboard) {
          this.validationService.getSelectedData = info;
          this.router.navigate(['/retailers']);
        }
        console.log(data);
        this.dtTrigger.next();

      })
      .catch(e => {
        console.log(e);
      });


  }

}
