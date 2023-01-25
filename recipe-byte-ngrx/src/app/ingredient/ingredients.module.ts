import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AddEditIngredientComponent } from './add-edit-ingredient/add-edit-ingredient.component';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { SharedModule } from '../user-interface/shared.module';

@NgModule({
  declarations: [
    IngredientsComponent,
    AddEditIngredientComponent,
    IngredientItemComponent,
  ],
  imports: [SharedModule, IngredientRoutingModule, FormsModule],
  exports: [],
})
export class IngredientsModule {}
