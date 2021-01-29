import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardListComponent } from './component/dashboard-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { DashboardService } from './service/dashboard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecondsToHoursModule } from "src/app/pipes/seconds-to-hours/seconds-to-hours.module";
import {MatCardModule} from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatIconModule } from "@angular/material/icon";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material'  
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import {MatPaginatorModule} from '@angular/material';
import {ProgressBarModule} from "angular-progress-bar"
import { MapviewComponent } from '../dashboard-list/mapview/mapview.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import {MatDividerModule} from '@angular/material/divider'; 
import {DASHBOARD} from 'src/app/constant/routes'

const routes: Routes = [
  {
    path: DASHBOARD,
    component: DashboardListComponent
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    SecondsToHoursModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "showSubtitle": false,
      // "subtitle": "%",
      "units": "%"
    }),
    MatCarouselModule.forRoot(),
    ChartsModule,
    MatTableModule,
    CheckNullPipeModule,
    MatPaginatorModule,
    ProgressBarModule,
    PinchZoomModule
  ],
  declarations: [DashboardListComponent, MapviewComponent],
  providers:[DashboardService],
  entryComponents: [MapviewComponent]

})
export class DashboardListModule { }
