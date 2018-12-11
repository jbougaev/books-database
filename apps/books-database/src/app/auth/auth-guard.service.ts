import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { take, map } from "rxjs/operators";

import { AuthFacade } from '../store';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authFacade: AuthFacade) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authFacade.authenticated$.pipe(
      map(r => 
        r),
      take(1));
  }
}
