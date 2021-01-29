import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminDetailComponent } from './component/sub-admin-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SubAdminDetailService } from './service/sub-admin-detail.service';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { CheckNullPipeModule } from 'src/app/pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from 'src/app/pipes/custom-date/custom-date-pipe.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
const addroutes: Routes = [

  {
    path: '', component: SubAdminDetailComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(addroutes),
    MatButtonModule,
    AbsoluteRoutingModule,
    CheckNullPipeModule,
    CustomDatePipeModule
  ],
  declarations: [SubAdminDetailComponent],
  providers: [SubAdminDetailService]
})
export class SubAdminDetailModule { }
