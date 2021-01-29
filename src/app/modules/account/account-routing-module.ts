import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from '../../constant/routes';
import { AccountGuard } from 'src/app/guards/account.guard';

const accountRoutes: Routes = [

  {
    path: '', component: AccountComponent, children: [
      { path: '', redirectTo: LOGIN, pathMatch: 'full' },
      { path: LOGIN, loadChildren: './login/login.module#LoginModule' },
      { path: FORGOT_PASSWORD, loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' },
      { path: `${RESET_PASSWORD}/:token`, loadChildren: './reset-password/reset-password.module#ResetPasswordModule' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
