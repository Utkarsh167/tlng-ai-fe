import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryLogComponent } from './entrylog.component';
import { ADD, EDIT, ARCHIVE } from '../../../constant/routes';
import { HomeGuard } from '../../../guards/home.guard';


const employeeRoutes: Routes = [

  {
    path: '', component: EntryLogComponent, children: [
      { path: '', loadChildren: './entrylog-list/entrylog-list.module#EntryLogListModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ADD, loadChildren: './entrylog-add/entrylog-add.module#EntryLogAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: ARCHIVE, loadChildren: './entrylog-archive/entrylog-archive.module#EntryLogArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:driverId`, loadChildren: './entrylog-add/entrylog-add.module#EntryLogAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard]},
      { path: `:driverId`, loadChildren: './entrylog-detail/entrylog-detail.module#EntryLogDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard]}
    ]
  }

];






@NgModule({
  declarations: [EntryLogComponent],
  imports: [
    RouterModule.forChild(employeeRoutes), 
    CommonModule
  ]
})
export class EntryLogModule { }
