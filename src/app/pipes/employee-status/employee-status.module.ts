import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeStatusPipe } from './employee-status.pipe';

@NgModule({
  declarations: [EmployeeStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [EmployeeStatusPipe]
})
export class EmployeeStatusModule { }
