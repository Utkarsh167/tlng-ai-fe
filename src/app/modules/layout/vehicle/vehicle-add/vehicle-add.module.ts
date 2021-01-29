import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleAddComponent } from './component/vehicle-add.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { VehicleAddService } from './service/vehicle-add.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../../pipes/validation-error/validation-error-pipe.module';
import { SharedModule } from '../../../shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NumberOnlyModule } from '../../../../directives/number-only/number-only.module';

@NgModule({
  declarations: [VehicleAddComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NumberOnlyModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild([
      { 
        path: '',
        component: VehicleAddComponent
      }
    ])
  ],
  providers: [VehicleAddService]
})
export class VehicleAddModule { }
