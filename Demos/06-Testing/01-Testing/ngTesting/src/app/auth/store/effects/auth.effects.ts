import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, pluck, tap } from 'rxjs/operators';
import { FBAuthService } from '../../fbauth.service';
import {
  AuthActionTypes,
  LoginErr,
  LoginSuccess,
  LogoutComplete,
  RegisterErr,
  RegisterSuccess,
} from '../actions/auth.actions';
import { LoginVM } from '../../login-credential.model';
import { routerRequestAction, RouterRequestAction } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private as: FBAuthService,
    private router: Router
  ) {}

  
  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    pluck('payload'),
    exhaustMap((pl: LoginVM) =>
      this.as
        .logOn(pl.email, pl.password)
        .then((cred) => new LoginSuccess(cred.user))
        .catch((err) => new LoginErr(err))
    )
  ));

  
  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.Register),
    pluck('payload'),
    exhaustMap((pl: LoginVM) =>
      this.as
        .createUser(pl.email, pl.password)
        .then((cred) => new RegisterSuccess(cred.user))
        .catch((err) => new RegisterErr(err))
    )
  ));

  
  logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    pluck('payload'),
    exhaustMap(() => this.as.logOff().then(() => new LogoutComplete()))
  ));

  // Redirect to login page
  
  loginRedirect$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    pluck('payload'),
    exhaustMap(() => {
      this.router.navigate(['demos', 'login']);
      return EMPTY;
    })
  ));

  // Redirects after RegisterSuccess and RegisterErr
  
  registerUserResult$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.RegisterSuccess, AuthActionTypes.RegisterErr),
    pluck('payload'),
    exhaustMap(() => {
      this.router.navigate(['demos']);
      return EMPTY;
    })
  ));
}
