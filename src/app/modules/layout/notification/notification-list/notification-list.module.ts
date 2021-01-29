import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './component/notification-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { NotificationListService } from './service/notification-list.service';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  }
];

@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    SearchFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateFilterModule
  ],
  providers: [NotificationListService]
})
export class NotificationListModule { }
