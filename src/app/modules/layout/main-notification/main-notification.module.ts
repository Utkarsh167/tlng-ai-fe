import { WEBNOTI, NOTI } from './../../../constant/routes';
import { AbsoluteRoutingModule } from './../../../pipes/absolute-routing/absolute-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNotificationComponent } from './main-notification.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from 'src/app/guards/home.guard';

const notificationRoutes: Routes = [
  {
    path: '', component: MainNotificationComponent,
    children: [
      { path: '', redirectTo: WEBNOTI, pathMatch: 'full' },

      // { path: NOTI, loadChildren: './../notification/notification.module#NotificationModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },

      { path: '', loadChildren: './../admin-notifications/admin-notifications.module#AdminNotificationsModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
    // children: [
    //   { path: '', redirectTo: NOTI_LIST, pathMatch: 'full' },
    //   { path: NOTI_LIST, loadChildren: './main-notification-list/main-notification-list.module#MainNotificationListModule' },
    // ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(notificationRoutes),
    AbsoluteRoutingModule
  ],
  declarations: [MainNotificationComponent]
})
export class MainNotificationModule { }
