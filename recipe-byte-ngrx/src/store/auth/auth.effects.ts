import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { signInUrl, signUpUrl, userDataUrl } from '../../config/firebase';
import { environment } from '../../environments/environment';
import { CurrentUser } from '../../model/CurrentUser';
import { AppStore } from '../store.model';
import * as Auth from './auth.actions';

export interface AuthRes {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
}

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(Auth.LOGIN_START),
    switchMap((action: Auth.LoginStartAction) => {
      const userData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true,
      };
      return this.http
        .post<AuthRes>(signInUrl(environment.firebase_api), userData)
        .pipe(
          map((resData) => {
            let fullName: string;
            this.getCurrentUser(resData.localId).subscribe((userResData) => {
              fullName = userResData.fullName;
            });
            const expiresIn: number = +resData.expiresIn * 1000;
            const expTime = new Date(new Date().getTime() + expiresIn);
            const user: Auth.UserData = {
              email: resData.email,
              fullName: fullName,
              userId: resData.localId,
              token: resData.idToken,
              expTime: expTime,
              redirect: true,
            };
            this.autoLogout(expiresIn);
            localStorage.setItem('userData', JSON.stringify(user));
            return new Auth.LoginAction(user);
          }),
          catchError(this.errorHandler)
        );
    })
  );

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Auth.LOGIN),
        tap((action: Auth.LoginAction) => {
          if (action.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType(Auth.SIGNUP_START),
    switchMap((action: Auth.SignUpStartAction) => {
      const userData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true,
      };
      return this.http
        .post<AuthRes>(signUpUrl(environment.firebase_api), userData, {
          observe: 'response',
        })
        .pipe(
          map((res) => {
            if (res.ok) {
              const userId = res.body.localId;
              this.createUser(
                userId,
                action.payload.email,
                action.payload.fullName
              );
            }
            return new Auth.SignUpSuccessAction();
          }),
          catchError(this.errorHandler)
        );
    })
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Auth.SIGNUP_SUCCESS),
        tap(() => {
          this.router.navigate(['auth', 'login']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Auth.LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  setCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Auth.SET_CURRENT_USER),
      map(() => {
        const userData: Auth.UserData = JSON.parse(
          localStorage.getItem('userData')
        );
        if (!userData) {
          return new Auth.DoNothingAction();
        }
        const user = new CurrentUser(
          userData.email,
          userData.fullName,
          userData.userId,
          userData.token,
          new Date(userData.expTime)
        );

        const loggedOutIn =
          new Date(userData.expTime).getTime() - new Date().getTime();

        if (user.token) {
          this.autoLogout(loggedOutIn);
          return new Auth.LoginAction({
            email: user.email,
            userId: user.userId,
            fullName: user.fullName,
            token: user.token,
            expTime: new Date(userData.expTime),
            redirect: false,
          });
        } else {
          return new Auth.DoNothingAction();
        }
      })
    )
  );

  timer: any = null;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppStore>
  ) {}

  private errorHandler(errRes) {
    let errors = [];
    let message = 'Somthing went wrong!';
    if (!errRes.error || errRes.error.error.errors.length === 0) {
      return of(new Auth.AuthErrorAction(message));
    } else {
      errors = errRes.error.error.errors;
    }
    if (errors.length > 0 && errors[0].message === 'EMAIL_EXISTS') {
      message = 'Email already in use!';
    }
    if (errors.length > 0 && errors[0].message === 'EMAIL_NOT_FOUND') {
      message = 'User Does not exists!';
    }
    if (errors.length > 0 && errors[0].message === 'INVALID_PASSWORD') {
      message = 'Invalid Password!';
    }
    return of(new Auth.AuthErrorAction(message));
  }

  private autoLogout(expTime: number) {
    this.timer = setTimeout(() => {
      this.clearTimeout();
      this.store.dispatch(new Auth.LogoutAction());
    }, expTime);
  }

  private clearTimeout() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private createUser(userId: string, email: string, fullName: string) {
    const newUser = {
      email: email,
      fullName: fullName,
    };
    return this.http.put(userDataUrl(userId), newUser).subscribe();
  }

  private getCurrentUser(userId: string) {
    return this.http.get<CurrentUser>(userDataUrl(userId));
  }
}
