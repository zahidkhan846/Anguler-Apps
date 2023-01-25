import { Recipe } from '../../model/Recipe';

import * as RecipeActions from '../recipe/recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState = {
  recipes: [],
};

export const recipeRecuder = (
  state = initialState,
  action: RecipeActions.RecipesAction
) => {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      const selectedRecipeIndex = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.recipeId
      );
      const selectedRecipe = {
        ...state.recipes[selectedRecipeIndex],
        ...action.payload.recipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[selectedRecipeIndex] = selectedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe.id !== action.payload.recipeId
        ),
      };
    default:
      return state;
  }
};
