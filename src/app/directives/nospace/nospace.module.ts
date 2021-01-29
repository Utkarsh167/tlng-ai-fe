import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NospaceDirective } from './nospace.directive';

@NgModule({
  declarations: [NospaceDirective],
  imports: [
    CommonModule
  ],
  exports:[NospaceDirective]
})
export class NospaceModule { }
