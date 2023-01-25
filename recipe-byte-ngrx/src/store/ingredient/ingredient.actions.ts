import { Action } from '@ngrx/store';
import { Ingredient } from '../../model/Ingredient';

export const actionTypes = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  ADD_INGREDIENTS: 'ADD_INGREDIENTS',
  UPDATE_INGREDIENT: 'UPDATE_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  SELECTED_INGREDIENT: 'SELECTED_INGREDIENT',
};

export class AddIngredientAction implements Action {
  readonly type = actionTypes.ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredientsAction implements Action {
  readonly type = actionTypes.ADD_INGREDIENTS;
  constructor(public payload: any) {}
}

export class UpdateIngredient implements Action {
  readonly type = actionTypes.UPDATE_INGREDIENT;
  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = actionTypes.DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class SelectedIngredient implements Action {
  readonly type = actionTypes.SELECTED_INGREDIENT;
  constructor(public payload: number) {}
}

export type IngredientActions =
  | AddIngredientAction
  | AddIngredientsAction
  | UpdateIngredient
  | DeleteIngredient
  | SelectedIngredient;
