import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  LoginStartAction,
  SignUpStartAction,
} from '../../../store/auth/auth.actions';
import { AppStore } from '../../../store/store.model';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css'],
})
export class RegisterLoginComponent implements OnInit {
  path: string = '';
  error: string = null;
  isLoading: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.isLoading;
      this.error = state.error;
    });

    this.route.url
      .pipe(
        map((value) => {
          return value[0].path;
        })
      )
      .subscribe((path) => {
        this.path = path;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isPathRegister(): boolean {
    if (this.path === 'register') {
      return true;
    } else {
      return false;
    }
  }

  isErrorsSet(): boolean {
    if (this.error) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const userData: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = form.value;
    this.isLoading = true;
    if (this.isPathRegister()) {
      if (userData.password !== userData.confirmPassword) {
        this.error = 'Password did not match!';
        this.isLoading = false;
        return;
      }
      this.store.dispatch(
        new SignUpStartAction({
          fullName: userData.fullName,
          email: userData.email,
          password: userData.password,
        })
      );
    } else {
      this.store.dispatch(
        new LoginStartAction({
          email: userData.email,
          password: userData.password,
        })
      );
    }
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onClose() {
    this.isLoading = false;
  }

  onClearError() {
    this.error = null;
  }
}
