import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN = 'LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const DO_NOTHING = 'DO_NOTHING';

export interface UserData {
  email: string;
  fullName: string;
  userId: string;
  token: string;
  expTime: Date;
  redirect: boolean;
}

export class LoginStartAction implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthErrorAction implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload: string) {}
}

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: UserData) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class SignUpStartAction implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: { fullName: string; email: string; password: string }
  ) {}
}
export class SignUpSuccessAction implements Action {
  readonly type = SIGNUP_SUCCESS;
}

export class SetCurrentUserAction implements Action {
  readonly type = SET_CURRENT_USER;
}

export class DoNothingAction implements Action {
  readonly type = DO_NOTHING;
}

export type AuthActions =
  | LoginAction
  | LogoutAction
  | LoginStartAction
  | AuthErrorAction
  | SignUpStartAction
  | SignUpSuccessAction
  | SetCurrentUserAction
  | DoNothingAction;
