import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { switchMap,tap, catchError } from 'rxjs/operators';
import { AuthService } from "../../models/auth/auth.service";
import * as AuthActions from './auth.actions';
import { of} from "rxjs";

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
          }),
          catchError((error) => {
            return of({type: AuthActions.AuthActionTypes.SetError,error: error.error.message});
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
