import { AuthState } from './auth/auth.reducer';
import { IngredientState } from './ingredient/ingredient.reducer';
import { RecipeState } from './recipe/recipe.reducer';

export interface AppStore {
  recipe: RecipeState;
  ingredient: IngredientState;
  auth: AuthState;
}
