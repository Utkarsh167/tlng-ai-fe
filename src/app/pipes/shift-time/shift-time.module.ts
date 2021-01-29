import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftTimePipe } from './shift-time.pipe';

@NgModule({
  declarations: [ShiftTimePipe],
  imports: [
    CommonModule
  ],
  exports: [ShiftTimePipe]
})
export class ShiftTimeModule { }
