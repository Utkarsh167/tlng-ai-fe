import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { ADD, EDIT, ARCHIVE } from '../../../constant/routes';
import { SharedModule } from '../../shared/shared.module';
import { HomeGuard } from '../../../guards/home.guard';


const employeeRoutes: Routes = [

  {
    path: '', component: EmployeeComponent, children: [
      { path: '', loadChildren: './employee-list/employee-list.module#EmployeeListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ADD, loadChildren: './employee-add/employee-add.module#EmployeeAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ARCHIVE, loadChildren: './employee-archive/employee-archive.module#EmployeeArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:employeeId`, loadChildren: './employee-add/employee-add.module#EmployeeAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `:employeeId`, loadChildren: './employee-detail/employee-detail.module#EmployeeDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

    ]
  }

];

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(employeeRoutes)
  ]
})
export class EmployeeModule { }
