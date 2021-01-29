import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoCommaPipe } from './no-comma.pipe';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NoCommaPipe,
  ],
  exports: [
    NoCommaPipe,
  ]

})
export class NoCommaPipeModule { }
