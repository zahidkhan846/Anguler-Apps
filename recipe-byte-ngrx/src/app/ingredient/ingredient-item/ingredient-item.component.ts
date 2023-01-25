import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../../model/Ingredient';
import { DeleteIngredient } from '../../../store/ingredient/ingredient.actions';
import { AppStore } from '../../../store/store.model';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() ingIndex: number;
  constructor(private router: Router, private store: Store<AppStore>) {}

  ngOnInit(): void {}

  onEdit(index: number) {
    this.router.navigate(['ingredient', index, 'edit']);
  }

  onDelete(index: number) {
    this.store.dispatch(new DeleteIngredient(index));
  }
}
