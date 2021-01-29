import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatusPipe } from './request-status.pipe';

@NgModule({
  declarations: [RequestStatusPipe],
  imports: [
    CommonModule
  ],
  exports: [RequestStatusPipe]
})
export class RequestStatusModule { }
