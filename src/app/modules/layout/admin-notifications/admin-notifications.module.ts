import { ADD, EDIT } from './../../../constant/routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNotificationsComponent } from './admin-notifications.component';
import { Routes, RouterModule } from '@angular/router';
import { NOTI_LIST } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';

const notificationRoutes: Routes = [
  {
    path: '', component: AdminNotificationsComponent,
    children: [
      { path: '', redirectTo: NOTI_LIST, pathMatch: 'full' },
      { path: NOTI_LIST, loadChildren: '../admin-notifications/notification-list/notification-list.module#NotificationListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ADD, loadChildren: '../admin-notifications/notification-add/notification-add.module#NotificationAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:notiId`, loadChildren: '../admin-notifications/notification-add/notification-add.module#NotificationAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(notificationRoutes)
  ],
  declarations: [AdminNotificationsComponent]
})
export class AdminNotificationsModule { }
