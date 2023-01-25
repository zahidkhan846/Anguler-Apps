import { Ingredient } from 'src/model/Ingredient';
import { actionTypes, IngredientActions } from './ingredient.actions';

export interface IngredientState {
  ingredients: Ingredient[];
  selectedIng: Ingredient;
}

const initialState: IngredientState = {
  ingredients: [new Ingredient('Bun', 2), new Ingredient('Meat', 1)],
  selectedIng: null,
};

export const ingredientReducer = (
  state: IngredientState = initialState,
  action: IngredientActions
) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case actionTypes.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const ingCopy = { ...ingredient, ...action.payload.ingredient };
      const ingredientsCopy = [...state.ingredients];
      ingredientsCopy[action.payload.index] = ingCopy;

      return {
        ...state,
        ingredients: ingredientsCopy,
      };
    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== action.payload
        ),
      };
    case actionTypes.SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIng: { ...state.ingredients[action.payload] },
      };
    default:
      return state;
  }
};
