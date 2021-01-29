import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToHoursPipe } from './seconds-to-hours.pipe';

@NgModule({
  declarations: [SecondsToHoursPipe],
  imports: [
    CommonModule
  ],
  exports:[SecondsToHoursPipe]
})
export class SecondsToHoursModule { }
