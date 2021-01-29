import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleDateFilterComponent } from './component/schedule-date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ScheduleDateFilterComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [ScheduleDateFilterComponent]
})
export class ScheduleDateFilterModule { }
