import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { REPORTS, REPORTS_LIST } from 'src/app/constant/routes';

const reportsRoutes: Routes = [
  {
    path: '', component: ReportsComponent,

    children: [
      { path: '', redirectTo: REPORTS, pathMatch: 'full' },
      { path: REPORTS, loadChildren: './reports-list/reports-list.module#ReportsListModule'},
      // {
      //   path: '', loadChildren: () => import('./dashboard-list/dashboard-list.module').then(m => m.DashboardListModule),
      // }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(reportsRoutes)
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
