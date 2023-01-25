import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavGuardService } from '../../services/nav-guard.service';
import { RecipeResolver } from '../../services/recipe-resolver.service';
import { AddEditRecipeComponent } from './add-edit-recipe/add-edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolver],
      },
    ],
  },
  {
    path: ':id/edit',
    component: AddEditRecipeComponent,
    resolve: [RecipeResolver],
    canActivate: [NavGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
