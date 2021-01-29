import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineStatusComponent } from './online-status.component';

@NgModule({
  declarations: [OnlineStatusComponent],
  imports: [
    CommonModule
  ],
  exports: [OnlineStatusComponent]
})
export class OnlineStatusModule { }
