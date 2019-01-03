import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take, map } from "rxjs/operators";

import { AuthFacade } from '../store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authFacade: AuthFacade, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authFacade.authenticated$.pipe(
      map(r =>
        r),
      take(1),
      map(a => {
        if (a) {
          return true;
        } else {

          this.router.navigate(['/signin'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      }));
  }
}




