import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../../../model/Recipe';
import { Store } from '@ngrx/store';
import { AppStore } from './../../../store/store.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeSub: Subscription;

  constructor(private store: Store<AppStore>) {}

  ngOnInit() {
    this.recipeSub = this.store
      .select('recipe')
      .pipe(map((state) => state.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  hasRecipes() {
    return this.recipes.length > 0;
  }
}
