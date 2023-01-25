import { Action } from '@ngrx/store';
import { Recipe } from 'src/model/Recipe';

export const SET_RECIPES = 'SET_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const ADD_RECIPE_START = 'ADD_RECIPE_START';
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipeStart implements Action {
  readonly type = ADD_RECIPE_START;
  constructor(public payload: Recipe) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: { recipeId: string }) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { recipeId: string; recipe: Recipe }) {}
}

export type RecipesAction =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;
