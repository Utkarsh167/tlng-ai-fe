import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminComponent } from './sub-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { SUBADMIN_LIST, SUBADMIN_ADD, SUBADMIN_DETAIL, SUBADMIN_EDIT, SUBADMIN_ARCHIVE } from 'src/app/constant/routes';
import { HomeGuard } from 'src/app/guards/home.guard';


const subadminroutes: Routes = [

  {
    path: '', component: SubAdminComponent, children: [
      { path: '', redirectTo: SUBADMIN_LIST, pathMatch: 'full' },
      { path: SUBADMIN_LIST, loadChildren: './sub-admin-list/sub-admin-list.module#SubAdminListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      // sub-admin-satyam
      { path: SUBADMIN_ARCHIVE, loadChildren: './sub-admin-archive/sub-admin-archive.module#SubAdminArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: SUBADMIN_ADD, loadChildren: './sub-admin-add/sub-admin-add.module#SubAdminAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${SUBADMIN_EDIT}/:Id`, loadChildren: './sub-admin-add/sub-admin-add.module#SubAdminAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${SUBADMIN_DETAIL}/:subAdminId`, loadChildren: './sub-admin-detail/sub-admin-detail.module#SubAdminDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(subadminroutes)
  ],
  declarations: [SubAdminComponent]
})
export class SubAdminModule { }
