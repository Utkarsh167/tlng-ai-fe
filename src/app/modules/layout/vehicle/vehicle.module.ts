import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { ADD, EDIT, ARCHIVE } from '../../../constant/routes';
import { HomeGuard } from '../../../guards/home.guard';

const vehicleRoutes: Routes = [

  {
    path: '', component: VehicleComponent, children: [
      { path: '', loadChildren: './vehicle-list/vehicle-list.module#VehicleListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ADD, loadChildren: './vehicle-add/vehicle-add.module#VehicleAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ARCHIVE, loadChildren: './vehicle-archive/vehicle-archive.module#VehicleArchiveModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: `${EDIT}/:cabId`, loadChildren: './vehicle-add/vehicle-add.module#VehicleAddModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
      { path: ':cabId', loadChildren: './vehicle-detail/vehicle-detail.module#VehicleDetailModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }

];


@NgModule({
  declarations: [VehicleComponent],
  imports: [
    RouterModule.forChild(vehicleRoutes),
    CommonModule
  ]
})
export class VehicleModule { }
