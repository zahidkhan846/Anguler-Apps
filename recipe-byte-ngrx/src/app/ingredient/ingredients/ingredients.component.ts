import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ingredient } from '../../../model/Ingredient';
import { AppStore } from '../../../store/store.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  ingsSub: Subscription;
  hasIngredients = false;

  constructor(private store: Store<AppStore>) {}

  ngOnInit() {
    this.ingredients = this.store.select('ingredient');
    if (this.ingredients) {
      this.ingsSub = this.ingredients
        .pipe(
          map((ings) => {
            if (ings.ingredients.length > 0) {
              this.hasIngredients = true;
            } else {
              this.hasIngredients = false;
            }
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.ingsSub.unsubscribe();
  }
}
