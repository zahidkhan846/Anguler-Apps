import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppStore } from 'src/store/store.model';

@Injectable({ providedIn: 'root' })
export class NavGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppStore>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    next: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => state.currentUser),
      map((cu) => {
        const isAuth = !!cu;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }
}
