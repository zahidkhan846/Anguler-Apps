import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { databseUrl } from '../../config/firebase';
import { Recipe } from '../../model/Recipe';
import * as RecipeAction from './recipe.actions';

@Injectable()
export class RecipeEffects {
  fetchAllRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeAction.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(databseUrl('recipes'));
      }),
      map((resData) => {
        const allRecipes = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            allRecipes.push({ ...resData[key], id: key });
          }
        }
        return allRecipes;
      }),
      map((recipes) => {
        return new RecipeAction.SetRecipes(recipes);
      })
    );
  });

  addNewRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeAction.ADD_RECIPE_START),
      switchMap((action: RecipeAction.AddRecipeStart) => {
        return this.http
          .post<Recipe>(databseUrl('recipes'), action.payload)
          .pipe(
            map(() => {
              return action.payload;
            })
          );
      }),
      map((recipe) => new RecipeAction.AddRecipe(recipe))
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
