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
       private subscription : Subscription;
  constructor(private slSerivce: ShoppingListservice) { }

  ngOnInit(){
    this.ingredients=this.slSerivce.getIngredients();
    this.subscription = this.slSerivce.ingredientsChanged
     .subscribe(
       (ingredients: Ingredient[]) => {
         this.ingredients = ingredients;
       }
     );
  }

  onEditItem(index: number){
    this.slSerivce.startedEditing.next(index);
    // here the subject is emitting the index
  }

 ngOnDestroy(): void {
  this.subscription.unsubscribe;
 }
}
