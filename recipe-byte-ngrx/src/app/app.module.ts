import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from '../store/auth/auth.effects';
import { ingredientReducer } from '../store/ingredient/ingredient.reducer';
import { authReducer } from '../store/auth/auth.reducer';
import { recipeRecuder } from '../store/recipe/recipe.reducer';
import { AppStore } from '../store/store.model';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { CoreModule } from './core.module';
import { SharedModule } from './user-interface/shared.module';
import { RecipeEffects } from '../store/recipe/recipe.effects';

const rootReducer: ActionReducerMap<AppStore> = {
  ingredient: ingredientReducer,
  auth: authReducer,
  recipe: recipeRecuder,
};

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
