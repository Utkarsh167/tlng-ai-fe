import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomImagePipe } from './custom-image.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomImagePipe],
  exports:[CustomImagePipe]
})
export class CustomImageModule { }
