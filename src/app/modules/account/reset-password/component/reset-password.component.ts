import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../service/reset-password.service';
import { FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordHide = true;
  confirmPasswordHide = true;
  token: String;
  resetForm: FormGroup;

  constructor(
    private _accountService: ResetPasswordService,
    private _route: ActivatedRoute,
    private _utilityService: UtilityService
  ) {
    this.resetForm = this._accountService.createResetPasswordForm();
    this.token = this._route.snapshot.params.token;
  }

  ngOnInit() {
  }

  getControl(control) {
    return this.resetForm.controls[control];
  }

  resetPassword() {
    if (this.resetForm.controls["confirmPassword"].valid && this.resetForm.controls["password"].value != this.resetForm.controls["confirmPassword"].value) {
      this._utilityService.showAlert("Confirm password doesn't match");
     return;
   }
    if (this.resetForm.invalid || this.resetForm.disabled)
      return;
    let data = { ...this.resetForm.value };
    this.resetForm.disable();
    data['token'] = this.token;
    this._accountService.resetPassword(data)
      .subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this._utilityService.clearStorage();
          }
        },
        err => {
          this.resetForm.enable();
        }
      )
  }

}
