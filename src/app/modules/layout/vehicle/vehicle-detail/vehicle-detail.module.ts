import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailComponent } from './component/vehicle-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { VehicleDetailService } from './service/vehicle-detail.service';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../pipes/custom-image/custom-image.module';
import { FileTypeModule } from '../../../../pipes/file-type/file-type.module'

@NgModule({
  declarations: [VehicleDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedModule,
    CheckNullPipeModule,
    CustomDatePipeModule,
    CustomImageModule,
    RouterModule.forChild([
      {
        path: '',
        component: VehicleDetailComponent
      }
    ]),
    FileTypeModule
  ],
  providers: [VehicleDetailService]
})
export class VehicleDetailModule { }
