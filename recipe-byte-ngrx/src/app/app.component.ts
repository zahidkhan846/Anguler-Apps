import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import { SetCurrentUserAction } from 'src/store/auth/auth.actions';
import { FetchRecipes } from 'src/store/recipe/recipe.actions';
import { AppStore } from '../store/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppStore>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new SetCurrentUserAction());
    }
    this.store.dispatch(new FetchRecipes());
  }
}
