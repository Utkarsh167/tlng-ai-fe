import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntryLogAddComponent } from './component/entrylog-add.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { EntryLogAddService } from './service/entrylog-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../pipes/validation-error/validation-error-pipe.module';
import { SharedModule } from '../../../shared/shared.module';
import { NumberOnlyModule } from '../../../../directives/number-only/number-only.module';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [EntryLogAddComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    NumberOnlyModule,
    SharedModule,
    MatIconModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    RouterModule.forChild([
      {
        path: '',
        component: EntryLogAddComponent
      }
    ])
  ],
  providers: [EntryLogAddService]
})
export class EntryLogAddModule { }
