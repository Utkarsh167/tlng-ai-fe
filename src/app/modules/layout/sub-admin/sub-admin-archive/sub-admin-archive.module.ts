import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { SubAdminArchiveService } from './service/sub-admin-archive.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownFilterModule } from '../../layout-shared/dropdown-filter/dropdown-filter.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { SubAdminArchiveComponent } from './component/sub-admin-archive.component';

const listroutes: Routes = [
  {
    path: '', component: SubAdminArchiveComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(listroutes),
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    DropdownFilterModule,
    DateFilterModule,
    FilterCountModule,
    CustomDatePipeModule,
    SearchFilterModule,
    CheckNullPipeModule,
    
  ],
  declarations: [SubAdminArchiveComponent],
  providers: [SubAdminArchiveService]
})
export class SubAdminArchiveModule { }