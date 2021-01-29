import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginService } from "../service/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  constructor(private _loginService: LoginService) {
    this.createLoginForm();
  }
  ngOnInit() {}

  /* 
      Method For Creating Login Form 
  */
  createLoginForm() {
    this.loginForm = this._loginService.createLoginForm();
  }

  getControl(control) {
    return this.loginForm.controls[control];
  }

  /*  
       Method For Calling Login API
  */
  login() {
    if (this.loginForm.invalid || this.loginForm.disabled) {
      return;
    }
    const data = { ...this.loginForm.value };
    this.loginForm.disable();
    this._loginService.login(data).subscribe(
      response => {},
      err => {
        this.loginForm.enable();
      }
    );
  }
}
