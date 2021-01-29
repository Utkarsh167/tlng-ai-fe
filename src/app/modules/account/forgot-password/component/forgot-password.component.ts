import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { POPUP_MESSAGES } from '../../../../constant/messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  forgotForm: FormGroup;
  showSpinner = false;
  title = POPUP_MESSAGES.forgotPasswordTitle;

  constructor(
    private _forgotPasswordService: ForgotPasswordService
  ) {
      this.createForgotPasswordForm();
  }

  ngOnInit() {
  }
  /* 
      Method For Creating Forgot Password Form
  */
  createForgotPasswordForm() {
    this.forgotForm = this._forgotPasswordService.createForgotForm();
  }

  getControl(control) {
    return this.forgotForm.controls[control];
  }
  
  /*  
       Method For Calling Validating Email
  */
  validateEmail() {
    if (this.forgotForm.invalid)
      return;
    const data = { ...this.forgotForm.value };
    this.forgotForm.disable();
    this._forgotPasswordService.validateEmail(data)
      .subscribe(
        response => {
        },
        err => {
          this.forgotForm.enable();
        }
      )
  }
}
