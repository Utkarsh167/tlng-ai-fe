import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortEmployeePipe } from './sort-employee.pipe';

@NgModule({
  declarations: [SortEmployeePipe],
  imports: [
    CommonModule
  ],
  exports: [SortEmployeePipe]
})
export class SortEmployeeModule { }
