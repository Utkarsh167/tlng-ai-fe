import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminAddComponent } from './component/sub-admin-add.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SubAdminAddService } from './service/sub-admin-add.service';
import { ValidationErrorPipeModule } from 'src/app/pipes/validation-error/validation-error-pipe.module';
import { AbsoluteRoutingModule } from 'src/app/pipes/absolute-routing/absolute-routing.module';
import { NospaceModule } from 'src/app/directives/nospace/nospace.module';
import { MatSelectModule } from '@angular/material/select';

const addroutes: Routes = [
  {
    path: '', component: SubAdminAddComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(addroutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ValidationErrorPipeModule,
    AbsoluteRoutingModule,
    NospaceModule,
    MatSelectModule
  ],
  declarations: [SubAdminAddComponent],
  providers: [SubAdminAddService]
})
export class SubAdminAddModule { }
