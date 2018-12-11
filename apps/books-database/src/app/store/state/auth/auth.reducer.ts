import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.AuthActionTypes.Signup):
    case (AuthActions.AuthActionTypes.Signin):
      return {
        ...state,
        authenticated: true
      };
    case (AuthActions.AuthActionTypes.Logout):
      return {
        ...state,
        token: null,
        authenticated: false
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
