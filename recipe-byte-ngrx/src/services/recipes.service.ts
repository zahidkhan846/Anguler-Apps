import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { databseUrl } from 'src/config/firebase';
import { Recipe } from 'src/model/Recipe';
import { SetRecipes } from 'src/store/recipe/recipe.actions';
import { AppStore } from 'src/store/store.model';

@Injectable()
export class RecipesService {
  updatedRecipes = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private store: Store<AppStore>) {}

  fetchAllRecipes() {
    return this.http.get<Recipe[]>(databseUrl('recipes')).pipe(
      map((resData) => {
        const allRecipes = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            allRecipes.push({ ...resData[key], id: key });
          }
        }
        return allRecipes;
      }),
      tap((allRecipes: Recipe[]) => {
        this.store.dispatch(new SetRecipes(allRecipes));
      })
    );
  }

  setAllRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipes.next(this.recipes.slice());
  }

  getAllRecipes() {
    const copyOfRecipes = [...this.recipes];
    return copyOfRecipes;
  }

  getSelectedRecipe(recipeId: string) {
    return this.recipes.find((recipe: Recipe) => recipe.id === recipeId);
  }

  addNewRecipe(recipe: Recipe) {
    this.http
      .post<Recipe>(databseUrl('recipes'), recipe, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res.ok) {
          recipe.id = res.body.name;
          this.recipes.unshift(recipe);
          this.updatedRecipes.next(this.recipes.slice());
        }
      });
  }

  updateSelectedRecipe(updatedRecipe: Recipe) {
    const { id } = updatedRecipe;
    const index = this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
    this.recipes[index] = updatedRecipe;
    this.updatedRecipes.next(this.recipes.slice());
  }

  deleteSelectedRecipe(id: string) {
    const index = this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
    this.recipes.splice(index, 1);
    this.updatedRecipes.next(this.recipes.slice());
  }
}
