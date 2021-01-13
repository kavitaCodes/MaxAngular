import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListservice } from '../shopping-list.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    //  @ViewChild( 'nameInput' ) nameInputRef: ElementRef;
    //  @ViewChild( 'amountInput' ) amountInputRef: ElementRef;
    subscription: Subscription;
    @ViewChild('f', { static: false }) shoppingListForm: NgForm;
    //getting access to form using viewchild and local ref to form.
   editMode = false;
   editedItemIndex: number;
   editedItem : Ingredient;
  constructor(private slSerivce: ShoppingListservice) { }

  ngOnInit(){
   this.subscription = this.slSerivce.startedEditing.
   subscribe(
     (index: number) => {
       this.editMode = true;
       this.editedItemIndex = index;
       this.editedItem = this.slSerivce.getIngredient(index);
       this.shoppingListForm.setValue({
         name: this.editedItem.name,
         amount: this.editedItem.amount
       })
     }
   );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit( form: NgForm){
    // const ingName= this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient= new Ingredient(value.name,value.amount);
    if (this.editMode) {
      this.slSerivce.updateIngredients(this.editedItemIndex,newIngredient)
    } else {
      this.slSerivce.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();

  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false;
  }

  onDelete(){
   this.slSerivce.deleteIngredient(this.editedItemIndex);
   this.onClear();
  }
}
