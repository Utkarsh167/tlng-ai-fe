import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationAddComponent } from './component/notification-add.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterModule } from '../../layout-shared/search-filter/search-filter.module';
import { NotificationAddService } from './service/notification-add.service';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { NospaceModule } from 'src/app/directives/nospace/nospace.module'; 

const routes: Routes = [
  {
    path: '',
    component: NotificationAddComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SearchFilterModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    ValidationErrorPipeModule,
    AbsoluteRoutingModule,
    NospaceModule

  ],
  declarations: [NotificationAddComponent],
  providers: [NotificationAddService]
})
export class NotificationAddModule { }
