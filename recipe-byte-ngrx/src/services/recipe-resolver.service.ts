import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Recipe } from 'src/model/Recipe';
import { FetchRecipes, SET_RECIPES } from 'src/store/recipe/recipe.actions';
import { AppStore } from 'src/store/store.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private store: Store<AppStore>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipe').pipe(
      take(1),
      map((state) => state.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new FetchRecipes());
          return this.actions$.pipe(ofType(SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
