import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ValidationService } from './../../services/validation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-growers-table',
  templateUrl: './growers-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./growers-table.component.css']
})
export class GrowersTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() growersData: any;
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
    Promise.resolve(this.validationService.getGrowersData(2))
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
