import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCountComponent } from './filter-count.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterCountComponent],
  exports: [FilterCountComponent]
})
export class FilterCountModule { }
