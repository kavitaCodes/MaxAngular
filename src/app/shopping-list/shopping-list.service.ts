// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
export class ShoppingListservice {
  // ingredientsChanged= new EventEmitter<Ingredient[]>();
  ingredientsChanged= new Subject<Ingredient[]>();
    private ingredients: Ingredient []=[
        new Ingredient('Apples',5),
           new Ingredient('Tomatoes',4)
      ];


  getIngredients() {
   return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
   this.ingredients.push(ingredient);
  //  this.ingredientsChanged.emit(this.ingredients.slice());
   this.ingredientsChanged.next(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]){
   this.ingredients.push(...ingredients);
  //  this.ingredientsChanged.emit(this.ingredients.slice());
  this.ingredientsChanged.next(this.ingredients.slice());
  }
}
