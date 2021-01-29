import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ADMIN, ACCOUNT, APP_USER } from './constant/routes';
import { AccountGuard } from './guards/account.guard';
import { HomeGuard } from './guards/home.guard';
import { LayoutResolver } from './route-resolver/layout.resolver';
import { NotFoundComponent } from './modules/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: ACCOUNT, pathMatch: 'full' },
  { path: ACCOUNT, loadChildren: './modules/account/account.module#AccountModule', canLoad: [AccountGuard], canActivate: [AccountGuard] },
  { path: ADMIN, loadChildren: './modules/layout/layout.module#LayoutModule', resolve: { data: LayoutResolver } },
  // { path: APP_USER, loadChildren: './modules/app-user/app-user.module#AppUserModule', canLoad: [HomeGuard], canActivate: [HomeGuard], resolve: { data: LayoutResolver } },
  { path: APP_USER, loadChildren: './modules/app-user/app-user.module#AppUserModule' },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
