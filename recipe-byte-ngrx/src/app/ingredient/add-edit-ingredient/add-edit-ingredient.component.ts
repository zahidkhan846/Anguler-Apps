import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Ingredient } from '../../../model/Ingredient';
import {
  AddIngredientAction,
  SelectedIngredient,
  UpdateIngredient,
} from 'src/store/ingredient/ingredient.actions';
import { AppStore } from 'src/store/store.model';

@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.css'],
})
export class AddEditIngredientComponent implements OnInit, OnDestroy {
  @ViewChild('ingForm', { static: true }) ingForm: NgForm;

  ingIndex: number = null;
  editMode: boolean = false;
  ingredient: Ingredient = null;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap((p: Params) => {
          this.ingIndex = p.id;
          if (this.ingIndex) {
            this.store.dispatch(new SelectedIngredient(this.ingIndex));
          }
        })
      )
      .subscribe(() => {
        this.sub = this.store.select('ingredient').subscribe((state) => {
          if (state.selectedIng) {
            this.editMode = true;
            this.ingredient = state.selectedIng;
          } else {
            this.editMode = false;
          }
        });
        setTimeout(() => {
          this.ingForm.setValue({
            name: this.ingredient.name,
            qty: this.ingredient.quantity,
          });
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFormSubmit(ingForm: NgForm) {
    const ingredient = {
      name: ingForm.value.name,
      quantity: ingForm.value.qty,
    };

    if (this.editMode) {
      this.store.dispatch(
        new UpdateIngredient({ index: this.ingIndex, ingredient })
      );
    } else {
      this.store.dispatch(new AddIngredientAction(ingredient));
    }
    this.onClearForm();
    this.onGoBack();
  }

  onClearForm() {
    this.ingForm.reset();
  }

  onGoBack() {
    this.location.back();
  }
}
