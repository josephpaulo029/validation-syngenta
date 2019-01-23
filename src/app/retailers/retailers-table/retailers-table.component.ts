import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';

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

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    // console.log(this.growersData);
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
    this.viewData.emit(info);
  }

}
