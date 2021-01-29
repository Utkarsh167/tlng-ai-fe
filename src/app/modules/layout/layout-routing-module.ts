import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ADMIN_PROFILE, DASHBOARD, SUBADMIN, MAINNOTI, AUDITS, CHANGE_PASSWORD, REPORTS, EMPLOYEES, EMPLOYEES_LIST, VEHICLE, ENTRY_LOG } from '../../constant/routes';
import { HomeGuard } from '../../guards/home.guard';

const adminRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [

      { path: '', redirectTo: DASHBOARD, pathMatch: 'full' },
      {
        path: ADMIN_PROFILE, loadChildren: '../profile/profile.module#ProfileModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard], data: { defaultAccess: true }
      },
      {
        path: CHANGE_PASSWORD, loadChildren: '../change-password/change-password.module#ChangePasswordModule',
        canLoad: [HomeGuard], canActivate: [HomeGuard]
      },
  
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: MAINNOTI, loadChildren: './main-notification/main-notification.module#MainNotificationModule' },

      // { path: NOTI, loadChildren: './notification/notification.module#NotificationModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      // { path: WEBNOTI, loadChildren: './admin-notifications/admin-notifications.module#AdminNotificationsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: SUBADMIN, loadChildren: './sub-admin/sub-admin.module#SubAdminModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: AUDITS, loadChildren: './audit-logs/audit-logs.module#AuditLogsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: '', loadChildren: './realtimedata/realtimedata.module#RealTimeDataModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: '', loadChildren: './reports/reports.module#ReportsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    
      { path: EMPLOYEES, loadChildren: './employee/employee.module#EmployeeModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      
      { path: VEHICLE, loadChildren: './vehicle/vehicle.module#VehicleModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
     
      { path: ENTRY_LOG, loadChildren: './entrylog/entrylog.module#EntryLogModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
  
    ]
  }
];

@NgModule({

  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
