import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from "../../models/auth/auth.service";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router, private authService: AuthService) { }

  @Effect()
  authSignin = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.TrySignin),
      switchMap((action: AuthActions.TrySignup) => {
        return this.authService.getToken(action.payload.email, action.payload.password).pipe(
          switchMap((token: any) => {
            this.router.navigate(['/']);
            return [
              {
                type: AuthActions.AuthActionTypes.Signin
              },
              {
                type: AuthActions.AuthActionTypes.SetToken,
                payload: token.access_token
              }
            ];
          })

        );
      })
    );

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .pipe(
      ofType(AuthActions.AuthActionTypes.Logout),
      tap(() => {
        this.router.navigate(['/']);
      }));
}
