import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './component/notification-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { WebNotificationService } from './service/web-notification.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { DateFilterModule } from '../../layout-shared/date-filter/date-filter.module';
import { ScheduleDateFilterModule } from '../../layout-shared/schedule-date-filter/schedule-date-filter.module';
import { FilterCountModule } from '../../layout-shared/filter-count/filter-count.module';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    CustomDatePipeModule,
    SearchFilterModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    DateFilterModule,
    ScheduleDateFilterModule,
    FilterCountModule
  ],
  declarations: [NotificationListComponent],
  providers: [WebNotificationService]
})
export class NotificationListModule { }
