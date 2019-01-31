import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root'
})

export class NeedAuthGuardService implements CanActivate {

  constructor(private validationService: ValidationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.validationService.isLogged());
    const redirectUrl = route['_routerState']['url'];

    if (this.validationService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
