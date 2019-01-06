import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
  error: string;
}

const initialState: AuthState = {
  token: null,
  authenticated: false,
  error: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.AuthActionTypes.Signup):
    case (AuthActions.AuthActionTypes.Signin):
      return {
        ...state,
        authenticated: true,
        error: null
      };
    case (AuthActions.AuthActionTypes.Logout):
    case (AuthActions.AuthActionTypes.SigninFailed):
      return {
        ...state,
        token: null,
        authenticated: false,
        error: null
      };
      case (AuthActions.AuthActionTypes.SetError):
        return {
          ...state,
          token: null,
          authenticated: false,
          error: action.error
        };
    case (AuthActions.AuthActionTypes.SetToken):
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}

export const getAuthenticated = (state: AuthState) => 
state.authenticated;

export const getToken = (state: AuthState) => 
state.token;

export const getError = (state: AuthState) => 
state.error;
