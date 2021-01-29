import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './component/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeListService } from './service/employee-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { EMPLOYEES_LIST } from 'src/app/constant/routes';

const routes: Routes = [
  {
    path: EMPLOYEES_LIST,
    component: EmployeeListComponent
  }
];
const MATERIAL = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTooltipModule,
  MatSelectModule
]
@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ...MATERIAL,
    ReactiveFormsModule,
    CheckNullPipeModule,
    DateFilterModule,
    DropdownFilterModule,
    CustomDatePipeModule,
    SearchFilterModule,
    FilterCountModule,
    ShiftTimeModule,
    RouterModule.forChild(routes)
  ],
  providers: [EmployeeListService]
})
export class EmployeeListModule { }
