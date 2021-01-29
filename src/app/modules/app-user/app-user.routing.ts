import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppUserComponent } from './app-user.component';
import { RESET_PASSWORD } from '../../constant/routes';

const accountRoutes: Routes = [

  {
    path: '', component: AppUserComponent, children: [
      { path: `${RESET_PASSWORD}/:token`, loadChildren: '../account/reset-password/reset-password.module#ResetPasswordModule' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AppUserRoutingModule { }
