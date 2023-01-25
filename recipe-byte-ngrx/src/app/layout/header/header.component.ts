import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentUser } from '../../../model/CurrentUser';
import { LogoutAction } from '../../../store/auth/auth.actions';
import { AppStore } from '../../../store/store.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  currentUser: CurrentUser = null;

  constructor(private store: Store<AppStore>) {}

  ngOnInit(): void {
    this.authSub = this.store
      .select('auth')
      .pipe(map((state) => state.currentUser))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new LogoutAction());
  }
}
