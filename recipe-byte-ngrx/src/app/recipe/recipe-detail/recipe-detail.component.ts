import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppStore } from '../../../store/store.model';
import { Recipe } from '../../../model/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string = null;
  selectedRecipe: Recipe = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params.id;
      if (this.recipeId) {
        this.store
          .select('recipe')
          .pipe(
            map((state) => {
              return state.recipes.find(
                (recipe) => recipe.id === this.recipeId
              );
            })
          )
          .subscribe((recipe) => {
            this.selectedRecipe = recipe;
          });
      }
      if (!this.selectedRecipe && !this.recipeId) {
        this.location.back();
      }
    });
  }
}
