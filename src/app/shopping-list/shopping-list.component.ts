import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListservice } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
      ingredients: Ingredient [];
       private igChanged : Subscription;
  constructor(private slSerivce: ShoppingListservice) { }

  ngOnInit(){
    this.ingredients=this.slSerivce.getIngredients();
    this.igChanged = this.slSerivce.ingredientsChanged //this igChanged might have changed to 'subscription' name
     .subscribe(
       (ingredients: Ingredient[]) => {
         this.ingredients = ingredients;
       }
     );
  }

 ngOnDestroy(): void {
  this.igChanged.unsubscribe;
 }
}
