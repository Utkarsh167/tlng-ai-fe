import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeArchiveComponent } from './component/employee-archive.component';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeArchiveService } from './service/employee-archive.service';
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
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';


const routes: Routes = [
  {
    path: '',
    component: EmployeeArchiveComponent
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
  declarations: [EmployeeArchiveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...MATERIAL,
    CheckNullPipeModule,
    AbsoluteRoutingModule,
    CustomDatePipeModule,
    ShiftTimeModule
  ],
  providers: [EmployeeArchiveService]
})
export class EmployeeArchiveModule { }
