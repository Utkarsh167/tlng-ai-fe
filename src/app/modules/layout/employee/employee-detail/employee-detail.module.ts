import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailComponent } from './component/employee-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { EmployeeDetailService } from './service/employee-detail.service';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';  
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';

@NgModule({
  declarations: [EmployeeDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    CheckNullPipeModule,
    ShiftTimeModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    CustomDatePipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeDetailComponent
      }
    ])
  ],
  providers: [EmployeeDetailService]
})
export class EmployeeDetailModule { }
