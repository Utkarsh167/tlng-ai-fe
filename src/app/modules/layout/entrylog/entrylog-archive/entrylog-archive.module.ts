import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryLogArchiveComponent } from './component/entrylog-archive.component';
import { Routes, RouterModule } from '@angular/router';
import { EntryLogArchiveService } from './service/entrylog-archive.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../../shared/shared.module';
import { CheckNullPipeModule } from '../../../../pipes/check-null/check-null-pipe.module';
import { CustomDatePipeModule } from '../../../../pipes/custom-date/custom-date-pipe.module';
import { CustomImageModule } from '../../../../pipes/custom-image/custom-image.module';

const routes: Routes = [
  {
    path: '',
    component: EntryLogArchiveComponent
  }
];

@NgModule({
  declarations: [EntryLogArchiveComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    CheckNullPipeModule,
    MatSortModule,
    CustomDatePipeModule,
    CustomImageModule,
    MatMenuModule,
  ],
  providers: [EntryLogArchiveService]
})
export class EntryLogArchiveModule { }
