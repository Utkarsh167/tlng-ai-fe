import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NOTI_LIST } from 'src/app/constant/routes';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from 'src/app/guards/home.guard';

const notificationRoutes: Routes = [
  {
    path: '', component: NotificationComponent,

    children: [
      { path: '', redirectTo: NOTI_LIST, pathMatch: 'full' },
      { path: NOTI_LIST, loadChildren: './notification-list/notification-list.module#NotificationListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(notificationRoutes)
  ]
})
export class NotificationModule { }
