import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindDriverNamePipe } from './find-driver-name.pipe';

@NgModule({
  declarations: [FindDriverNamePipe],
  imports: [
    CommonModule
  ],
  exports: [FindDriverNamePipe]
})
export class FindDriverNameModule { }
