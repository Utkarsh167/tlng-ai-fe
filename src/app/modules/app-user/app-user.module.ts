import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserComponent } from './app-user.component';
import { AppUserRoutingModule } from './app-user.routing';

@NgModule({
  declarations: [AppUserComponent],
  imports: [
    CommonModule,
    AppUserRoutingModule
  ]
})
export class AppUserModule { }
