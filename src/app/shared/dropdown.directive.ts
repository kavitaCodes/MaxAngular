import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
  this.isOpen = !this.isOpen;
        }
  constructor() { }

}
// export class DropdownDirective {
//   @HostBinding('class.open') isOpen = false;
//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//   }
//   constructor(private elRef: ElementRef) {}
// }
//below directive is when we want dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.),
