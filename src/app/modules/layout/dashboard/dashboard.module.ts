import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { DASHBOARD, DASHBOARD_LIST } from 'src/app/constant/routes';

const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,

    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', loadChildren: './dashboard-list/dashboard-list.module#DashboardListModule'},
      // {
      //   path: '', loadChildren: () => import('./dashboard-list/dashboard-list.module').then(m => m.DashboardListModule),
      // }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
