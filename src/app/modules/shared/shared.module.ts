import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './services/http.service';
import { UtilityService } from './services/utility.service';
import { TokenInterceptor } from '../../Interceptors/token.interceptor';
import { HomeGuard } from '../../guards/home.guard';
import { AccountGuard } from '../../guards/account.guard';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DateRangeModalComponent } from './components/date-range-modal/date-range-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AbsoluteRoutingModule } from '../../pipes/absolute-routing/absolute-routing.module';
import { StatusPipe } from '../../pipes/status-pipe/status.pipe';
import { GroupEmployeeComponent } from './components/group-employee/group-employee.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ShiftTimeModule } from 'src/app/pipes/shift-time/shift-time.module';
import { SortEmployeeModule } from 'src/app/pipes/sort-employee/sort-employee.module';
import { EmployeeStatusModule } from 'src/app/pipes/employee-status/employee-status.module';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AbsoluteRoutingModule,
    NgxPermissionsModule,
    ShiftTimeModule,
    SortEmployeeModule,
    EmployeeStatusModule,
    OwlNativeDateTimeModule, 
    OwlDateTimeModule,
    MatDatepickerModule
  ],
  declarations: [
    ConfirmationModalComponent,
    GroupEmployeeComponent,
    StatusPipe,
    GroupEmployeeComponent,
    DateRangeModalComponent
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AbsoluteRoutingModule,
    StatusPipe
  ],
  entryComponents: [
    ConfirmationModalComponent,
    GroupEmployeeComponent,
    DateRangeModalComponent
  ],
  providers: [
    HttpService,
    UtilityService,
    HomeGuard,
    AccountGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
