import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNospace]'
})
export class NospaceDirective {

  constructor(
    private _el: ElementRef
  ) { }
  @HostListener('keydown',['$event']) keydown(e) {
    
    if (e.which === 32 && e.target.selectionStart === 0) {
      return false;
    }
  }

  
}