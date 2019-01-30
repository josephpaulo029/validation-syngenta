import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs/Observable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  arr: any;
  constructor() { }

  ngOnInit() {
  }

  loginUser(form: NgForm) {
    this.arr = form.value
    console.log(this.arr);
  }

}
