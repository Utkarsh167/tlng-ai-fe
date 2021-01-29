import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hours24To12Pipe } from './hours24-to12.pipe';

@NgModule({
  declarations: [Hours24To12Pipe],
  imports: [
    CommonModule
  ],
  exports:[Hours24To12Pipe]
})
export class Hours25To12Module { }
