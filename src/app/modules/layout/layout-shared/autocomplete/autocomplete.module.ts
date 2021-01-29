import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './component/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports:[
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
