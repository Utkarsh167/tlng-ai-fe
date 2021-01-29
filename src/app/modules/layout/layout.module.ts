import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './layout-parts/header/header.component';
import { FooterComponent } from './layout-parts/footer/footer.component';
import { LayoutRoutingModule } from './layout-routing-module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { CustomNameModule } from 'src/app/pipes/custom-name/custom-name.module'
import { NgxPermissionsModule } from 'ngx-permissions';
import { OnlineStatusModule } from '../online-status/online-status.module';
// Badge Module - Shivakumar A 
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({ 
  declarations: [PagesComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatMenuModule,
    SharedModule,
    CustomNameModule,
    NgxPermissionsModule,
    OnlineStatusModule,
    MatBadgeModule,
    
  ]
})
export class LayoutModule { }
