 import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListservice } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
 @Injectable()
export class RecipeService {

//  recipeSelected = new EventEmitter<Recipe>();
// private recipes: Recipe[] = [
//      new Recipe('A test recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Recipe_logo.jpeg/600px-Recipe_logo.jpeg'),
//      new Recipe('Shrimp', 'This is shrimp a test', 'https://storage.needpix.com/rsynced_images/food-1459693_1280.jpg')
//      ];

recipesChanged = new Subject<Recipe[]>();

private recipes: Recipe[] = [
     new Recipe('Apple pie',
      'This is delicious apple pie',
      'https://www.chewoutloud.com/wp-content/uploads/2012/12/apple-pie-3.jpg',
      [
       new Ingredient('Flour', 2),
       new Ingredient('apple', 2)
      ]),
     new Recipe('Burger',
     'This is a veggie burger', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/450px-RedDot_Burger.jpg',
     [
      new Ingredient('buns',2),
      new Ingredient('black bean', 20)
     ])
     ];



     constructor(private slService: ShoppingListservice){}

     getRecipes(){
      return this.recipes.slice();
     }

     addIngredientsToShoppingList(ingredients: Ingredient[]){
         this.slService.addIngredients(ingredients);
     }

     getRecipe(index: number) {
         return this.recipes[index];
     }

     addRecipe(recipe: Recipe){
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
     }

     updateRecipe(index: number, newRecipe: Recipe){
       this.recipes[index]= newRecipe;
       this.recipesChanged.next(this.recipes.slice());
     }


     deleteRecipe(index: number) {
       this.recipes.splice(index,1);
       this.recipesChanged.next(this.recipes.slice());
     }



}
