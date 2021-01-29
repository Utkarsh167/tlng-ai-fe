import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from 'src/app/guards/home.guard';
import { RealtimeDataComponent } from './realtimedata.component';


const realRoutes: Routes = [
  {
    path: '', component: RealtimeDataComponent,

    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', loadChildren: './realtime/realtime.module#RealTimeListModule', canLoad: [HomeGuard], canActivate: [HomeGuard] },
    ]
  }
];

@NgModule({
  declarations: [RealtimeDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(realRoutes)
  ]
})
export class RealTimeDataModule { }
