import { RealtimeComponent } from "./component/realtime.component";
import { AbsoluteRoutingModule } from "../../../../pipes/absolute-routing/absolute-routing.module";
import { DateFilterModule } from "../../layout-shared/date-filter/date-filter.module";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from '@angular/forms';
import { 
// imported MatSortModule - Shivakumar A
MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SearchFilterModule } from "../../layout-shared/search-filter/search-filter.module";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckNullPipeModule } from "src/app/pipes/check-null/check-null-pipe.module";
import { SecondsToHoursModule } from "src/app/pipes/seconds-to-hours/seconds-to-hours.module";
import { ValidationErrorPipe } from "src/app/pipes/validation-error/validation-error.pipe";
import { ValidationErrorPipeModule } from "src/app/pipes/validation-error/validation-error-pipe.module";
import { CustomDatePipeModule } from "src/app/pipes/custom-date/custom-date-pipe.module";
import { RealTimeService } from "./service/realtime.service";
import { FilterCountModule } from "../../layout-shared/filter-count/filter-count.module";
import { MapviewComponent } from './dialog/mapview/mapview.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import {REAL_TIME} from 'src/app/constant/routes'
import { NoCommaPipeModule } from 'src/app/pipes/no-comma/no-comma-pipe.module';
import { LightboxModule } from 'ngx-lightbox';
const routes: Routes = [
  {
    path: REAL_TIME,
    component: RealtimeComponent
  }
];

@NgModule({
  declarations: [
    RealtimeComponent,
    MapviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SearchFilterModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    DateFilterModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    AbsoluteRoutingModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    CheckNullPipeModule,
    ValidationErrorPipeModule,
    CustomDatePipeModule,
    FilterCountModule,
    // Added MatSortModule - Shivakumar A
    MatSortModule,
    SecondsToHoursModule,
    MatSidenavModule,
    MatSliderModule,
    FormsModule,
    PinchZoomModule,
    NoCommaPipeModule,
    LightboxModule
  ],
  providers: [RealTimeService],
  entryComponents: [MapviewComponent]

})
export class RealTimeListModule {}
