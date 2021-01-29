import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleListComponent } from './component/vehicle-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { VehicleListService } from './service/vehicle-list.service';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../pipes/custom-image/custom-image.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { VEHICLE_LIST } from 'src/app/constant/routes';

@NgModule({
  declarations: [VehicleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    CustomImageModule,
    DateFilterModule,
    DropdownFilterModule,
    SearchFilterModule,
    MatAutocompleteModule,
    MatMenuModule,
    FilterCountModule,
    MatOptionModule,
    RouterModule.forChild([
      {
        path: VEHICLE_LIST,
        component: VehicleListComponent
      }
    ])
  ],
  providers:[VehicleListService]
})
export class VehicleListModule { }
