import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryLogDetailComponent } from './component/entrylog-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { EntryLogDetailService } from './service/entrylog-detail.service';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../pipes/custom-image/custom-image.module';
import { FileTypeModule } from 'src/app/pipes/file-type/file-type.module';

@NgModule({
  declarations: [EntryLogDetailComponent],
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
        component: EntryLogDetailComponent
      }
    ]),
    FileTypeModule
  ],
  providers: [EntryLogDetailService]
})
export class EntryLogDetailModule { }
