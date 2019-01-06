import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  TrySignup = '[Auth] Try Signup',
  Signup = '[Auth] Signup',
  TrySignin = '[Auth] Try Signin',
  Signin = '[Auth] Signin',
  Logout = '[Auth] Logout',
  SetToken = '[Auth] Set Token',
  SigninFailed = '[Auth] Signin Failed',
  SetError= '[Auth] Set Error'
}

export class TrySignup implements Action {
  readonly type = AuthActionTypes.TrySignup;

  constructor(public payload: {email: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TrySignin;

  constructor(public payload: {email: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup;
}

export class Signin implements Action {
  readonly type = AuthActionTypes.Signin;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SetToken;

  constructor(public payload: string) {}
}

export class SetError implements Action {
  readonly type = AuthActionTypes.SetError;

  constructor(public error: string) {}
}

export class SigninFailed implements Action {
  readonly type = AuthActionTypes.SigninFailed;
}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin | SigninFailed | SetError;
