import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavGuardService } from '../services/nav-guard.service';
import { AddEditRecipeComponent } from './recipe/add-edit-recipe/add-edit-recipe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipe/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'ingredient',
    loadChildren: () =>
      import('./ingredient/ingredients.module').then(
        (m) => m.IngredientsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'add-recipe',
    component: AddEditRecipeComponent,
    canActivate: [NavGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
