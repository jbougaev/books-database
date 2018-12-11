import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';
import * as Selectors from "../index";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  authenticated$ : Observable<boolean> = this.store.pipe(select(Selectors.getAuthenticated));
  token$: Observable<string> = this.store.pipe(select(Selectors.getToken));

  constructor(private store: Store<AuthState> ) {}

  signin(email: string, password: string) {
    this.store.dispatch(new AuthActions.TrySignin({email, password}));
  }

  logout(){
    this.store.dispatch(new AuthActions.Logout());
  }

}
