import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditIngredientComponent } from './add-edit-ingredient/add-edit-ingredient.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsComponent,
  },
  {
    path: 'add-ing',
    component: AddEditIngredientComponent,
  },
  {
    path: ':id/edit',
    component: AddEditIngredientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRoutingModule {}
