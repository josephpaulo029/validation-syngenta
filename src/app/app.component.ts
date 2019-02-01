import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  // subscription: Subscription;

  // constructor(private router: Router) {
  //   // this.subscription = router.events.subscribe((event) => {
  //   //   if (event instanceof NavigationStart) {
  //   //     browserRefresh = !router.navigated;
  //   //     console.log("wew")
  //   //     // localStorage.removeItem('TOKEN');

  //   //   } else {
  //   //     // localStorage.removeItem('TOKEN');

  //   //   }
  //   // });
  // }

  @HostListener('window:onbeforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('userid');
  }

  // ngOnDestroy() {
  //   localStorage.removeItem('TOKEN');
  // }

}

