import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddEditRecipeComponent } from './add-edit-recipe/add-edit-recipe.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SharedModule } from '../user-interface/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    SingleRecipeComponent,
    AddEditRecipeComponent,
    RecipeDetailComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule, RecipeRoutingModule],
})
export class RecipesModule {}
