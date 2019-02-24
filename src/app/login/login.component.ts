import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationService } from './../services/validation.service';
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  arr: any;
  loginAuth: any;

  constructor(private validationService: ValidationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  loginUser(form: NgForm) {
    this.arr = form.value
    // console.log(this.arr)

    Promise.resolve(this.validationService.loginAuth(form.value)).then((data) => {
      // console.log(data);
      this.loginAuth = data;
      if (this.loginAuth.auth == true) {
        // console.log('success')
        this.router.navigate(['/dashboard']);
      }
    }).catch(e => {
      console.log(e);
    })
  }

}
