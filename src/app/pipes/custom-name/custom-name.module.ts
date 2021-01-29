import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNamePipe } from './custom-name.pipe';

@NgModule({
  declarations: [CustomNamePipe],
  imports: [
    CommonModule
  ],
  exports: [CustomNamePipe]
})
export class CustomNameModule { }
