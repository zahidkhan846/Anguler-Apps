import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeleteRecipe } from 'src/store/recipe/recipe.actions';

import { Ingredient } from '../../../model/Ingredient';
import { Recipe } from '../../../model/Recipe';
import { AddIngredientsAction } from '../../../store/ingredient/ingredient.actions';
import { AppStore } from '../../../store/store.model';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css'],
})
export class SingleRecipeComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {}

  onEdit(id: string) {
    this.router.navigate(['recipes', id, 'edit']);
  }

  onRemove(id: string) {
    this.store.dispatch(new DeleteRecipe({ recipeId: id }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddToIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredientsAction(ingredients));
    this.router.navigate(['ingredient']);
  }
}
