import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorPipeModule } from '../../../pipes/validation-error/validation-error-pipe.module';
import { LoginService } from './service/login.service';
import { AccountGuard } from 'src/app/guards/account.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AccountGuard]  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    ValidationErrorPipeModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
