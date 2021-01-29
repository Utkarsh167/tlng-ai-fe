import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewWeekendsPipe } from './view-weekends.pipe';

@NgModule({
  declarations: [ViewWeekendsPipe],
  imports: [
    CommonModule
  ],
  exports: [ViewWeekendsPipe]
})
export class ViewWeekendsModule { }
