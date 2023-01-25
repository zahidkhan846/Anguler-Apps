import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';

import { AppStore } from 'src/store/store.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppStore>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.currentUser),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const updatedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(updatedReq);
      })
    );
  }
}
