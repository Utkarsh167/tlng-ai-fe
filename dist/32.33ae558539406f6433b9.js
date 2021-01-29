(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"0kEm":function(e,t,n){"use strict";n.r(t);var a=n("mrSG"),r=n("CcnG"),o=n("Ip0R"),i=n("FpXt"),s=n("ZYCi"),c=n("gIcY"),m=n("FTgb"),h=n("iiAa"),l=n("XlPw"),p=n("buKM"),g=n("jRgp"),d=n("67Y/"),u=n("9Z1F"),b=n("MIKN"),f=n("Uq3Z"),L=n("Oy5v"),v=function(){function e(e,t,n,a,r,o,i){this._formBuilder=e,this._http=t,this._utilityService=n,this._router=a,this._formService=r,this._dataTransferService=o,this.permissionsService=i}return e.prototype.createLoginForm=function(){return this._formBuilder.group({email:this._formService.getControl("email"),password:this._formService.getControl("password")})},e.prototype.login=function(e){var t=this;return(e=this._utilityService.trim(e)).deviceToken=localStorage.getItem("ai-firebase-token"),e.deviceId=Math.floor(1e9*Math.random()).toString(),e.deviceToken||delete e.deviceToken,this._http.post(g.J,e).pipe(Object(d.a)(function(e){return t.loginSuccess(e.data),e}),Object(u.a)(function(e){return Object(l.a)(e)}))},e.prototype.loginSuccess=function(e){console.log(e),this.permissionsService.addPermission(e.adminObject.permission),this.permissionsService.loadPermissions(e.adminObject.permission),localStorage.setItem("ai-admin-token",e.accessToken),localStorage.setItem("ai-admin-role",e.adminObject.type),localStorage.setItem("ai-admin-name",e.adminObject.name),localStorage.setItem("ai-admin-id",e.adminObject._id),localStorage.setItem("companyLocationName",e.adminObject.companyLocationName),localStorage.setItem("adminPermission",JSON.stringify(e.adminObject.permission));var t=[];if(e.adminObject.company_details.locations.forEach(function(e){var n={};n.viewValue=e.name,n.value=e.name,t.push(n)}),localStorage.setItem("buildings",JSON.stringify(t)),console.log(localStorage.getItem("buildings")),this._dataTransferService.profileData=e.adminObject,e.adminObject.permission.length){var n=e.adminObject.permission[0];"dashboard"==n?this._router.navigate([""+L.DASHBOARD]):"entryLog"==n?this._router.navigate([""+L.DRIVER]):"emp_vehicle"==n?this._router.navigate([""+L.EMPLOYEES]):"realTimeDuration"==n?this._router.navigate([""+L.REAL_TIME]):"subadmin"==n?this._router.navigate([""+L.SUBADMIN]):"notification"==n?this._router.navigate([""+L.ADMIN_NOTIFICATION]):this._router.navigate([""+L.DRIVER])}else this._router.navigate([""+L.DASHBOARD])},e.ctorParameters=function(){return[{type:c.d},{type:m.a},{type:h.a},{type:s.d},{type:p.a},{type:b.a},{type:f.b}]},e=a.__decorate([Object(r.Injectable)(),a.__metadata("design:paramtypes",[c.d,m.a,h.a,s.d,p.a,b.a,f.b])],e)}(),x=function(){function e(e){this._loginService=e,this.hide=!0,this.createLoginForm()}return e.prototype.ngOnInit=function(){},e.prototype.createLoginForm=function(){this.loginForm=this._loginService.createLoginForm()},e.prototype.getControl=function(e){return this.loginForm.controls[e]},e.prototype.login=function(){var e=this;if(!this.loginForm.invalid&&!this.loginForm.disabled){var t=a.__assign({},this.loginForm.value);this.loginForm.disable(),this._loginService.login(t).subscribe(function(e){},function(t){e.loginForm.enable()})}},e.ctorParameters=function(){return[{type:v}]},e=a.__decorate([Object(r.Component)({selector:"app-login",template:n("K5Lt"),styles:[n("aJ9e")]}),a.__metadata("design:paramtypes",[v])],e)}(),M=n("UodH"),S=n("seP3"),_=n("SMsm"),j=n("b716"),y=n("3V+5"),O=n("+lFD");n.d(t,"LoginModule",function(){return I});var w=[{path:"",component:x,canActivate:[O.a]}],I=function(){function e(){}return e=a.__decorate([Object(r.NgModule)({imports:[o.c,s.e.forChild(w),i.a,j.b,S.c,M.a,_.a,c.n,y.a],declarations:[x],providers:[v]})],e)}()},"3V+5":function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),o=n("vblm"),i=n("FaG1"),s=function(){function e(){}return e.prototype.transform=function(e,t,n){return e&&e.errors?this.getValidationError(e,t,n):""},e.prototype.getValidationError=function(e,t,n){return this.charMessage=n||"characters",e.hasError("required")?t+" is required":e.hasError("pattern")?function(e,t){return e==i.a.email?"Please enter a valid "+t.toLowerCase():e==i.a.password?Object(o.j)(t)+" can not contain blank spaces":e==i.a.name?Object(o.j)(t)+" can not be blank":e==i.a.phone?Object(o.j)(t)+" must contain only numbers and can not start with 0":e==i.a.onlyNumber?"Only digits are allowed":e==i.a.price?Object(o.j)(t)+" must be numeric":e==i.a.alphaNumeric?Object(o.j)(t)+" can contain only characters and numbers":e==i.a.alphaNumericWithSpace?Object(o.j)(t)+" can contain only characters and numbers":e==i.a.alphabetsWithSpace?Object(o.j)(t)+" can contain only characters and space":e==i.a.noSpace?Object(o.j)(t)+" can't contain space":void 0}(e.errors.pattern.requiredPattern,t):e.hasError("minlength")?Object(o.j)(t)+" must be at least "+e.errors.minlength.requiredLength+" "+this.charMessage+" long":e.hasError("maxlength")?Object(o.j)(t)+" can not be more than "+e.errors.maxlength.requiredLength+" "+this.charMessage+" long":e.hasError("matchPassword")?o.g[t].matchPassword||"":e.hasError("min")?Object(o.j)(t)+" can not be less than "+e.errors.min.min:e.hasError("max")?Object(o.j)(t)+" can not be greater than "+e.errors.max.max:e.hasError("alpha")?" Please enter correct "+Object(o.j)(t):void 0},e=a.__decorate([Object(r.Pipe)({name:"validate",pure:!1}),a.__metadata("design:paramtypes",[])],e)}(),c=n("Ip0R"),m=n("gIcY");n.d(t,"a",function(){return h});var h=function(){function e(){}return e=a.__decorate([Object(r.NgModule)({imports:[c.c,m.n],declarations:[s],exports:[s],providers:[]})],e)}()},FaG1:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,password:/^[^\s]+$/,name:/(.|\s)*\S(.|\s)*/,phone:"^[1-9][0-9]*$",price:/(^[0][1-9]+)|([1-9]\d*)+$/,alphaNumeric:"^[a-zA-Z0-9]+$",alphaNumericWithSpace:"^[a-zA-Z0-9 ]+$",alphabetsWithSpace:"^[a-zA-Z ]*$",onlyNumber:"^[0-9]*$",noSpace:/^\S*$/,REGNO:/(^[A-Za-z]{2}(?:[0-9]){2}(?:[A-Za-z]){1,2}([0-9]){4})$/i}},K5Lt:function(e,t){e.exports='\x3c!-- <h1 class="form_heading">Login</h1> --\x3e\n<form [formGroup]="loginForm" (ngSubmit)="login()">\n  <div >\n    <mat-form-field appearance="outline">\n      <mat-label>Email</mat-label>\n      <input matInput formControlName="email">\n      <mat-error>{{getControl(\'email\')|validate:\'Email\'}}</mat-error>\n    </mat-form-field>\n  </div>\n  <div class="text-right">\n      <a [routerLink]="\'FORGOT_PASSWORD\'|absolutePath" class="form-text small text-muted">\n          Forgot password?\n        </a>\n    \x3c!-- <a class="forgot" >Forgot Password</a> --\x3e\n  </div>\n  <div >\n    <mat-form-field appearance="outline">\n      <mat-label>Password</mat-label>\n      <input matInput formControlName="password" [type]="hide ? \'password\' :\'text\'">\n      <mat-error>{{getControl(\'password\')|validate:\'Password\'}}</mat-error>\n      <mat-icon matSuffix (click)="hide = !hide">\n        {{hide ? \'visibility_off\' :\'visibility\'}}\n      </mat-icon>\n    </mat-form-field>\n  </div>\n \n  <div class="form_filed_wrapper text-center">\n    <button class="btn btn-lg btn-block btn-primary mb-3">Login</button>\n  </div>\n</form>'},aJ9e:function(e,t){e.exports=""},buKM:function(e,t,n){"use strict";var a=n("mrSG"),r=n("CcnG"),o=n("gIcY"),i=n("FaG1"),s={emailMaxLength:100,passwordMinLength:8,passwordMaxLength:20,nameMinLength:3,nameMaxLength:100,phoneMinLength:10,phoneMaxLength:10,locationMinLength:3,locationMaxLength:1e3,priceMinLength:1,priceMaxLength:10,minSeat:2,maxSeat:20,numberMinLength:1,numberMaxLength:10,regNoMaxLength:10,regNoMinLength:9};n.d(t,"a",function(){return c});var c=function(){function e(){this.VALIDATION={name:[o.o.pattern(i.a.alphabetsWithSpace),o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],id:[o.o.pattern(i.a.noSpace),o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],profileName:[o.o.pattern(i.a.name),o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],alphabetic:[o.o.pattern(i.a.alphabetsWithSpace),o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],alphaNumeric:[o.o.pattern(i.a.alphaNumericWithSpace),o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],number:[o.o.pattern(i.a.onlyNumber),o.o.minLength(s.numberMinLength),o.o.maxLength(s.numberMaxLength)],price:[o.o.pattern(i.a.price),o.o.minLength(s.priceMinLength),o.o.maxLength(s.priceMaxLength),o.o.min(0)],seatingCapacity:[o.o.required,o.o.pattern(i.a.phone),o.o.min(s.minSeat),o.o.max(s.maxSeat)],email:[o.o.pattern(i.a.email),o.o.maxLength(s.emailMaxLength)],description:[o.o.pattern(i.a.name),o.o.minLength(s.locationMinLength),o.o.maxLength(s.locationMaxLength)],password:[o.o.pattern(i.a.password),o.o.minLength(s.passwordMinLength),o.o.maxLength(s.passwordMaxLength)],phone:[o.o.required,o.o.pattern(i.a.phone),o.o.minLength(s.phoneMinLength),o.o.maxLength(s.phoneMaxLength)],crfLimitMonth:[o.o.required,o.o.pattern(i.a.onlyNumber)],phoneManual:[o.o.pattern(i.a.phone),o.o.maxLength(s.phoneMaxLength)],dropdown:[],checkbox:[],address:[o.o.required],longitude:[o.o.required],latitude:[o.o.required],startShift:[o.o.required],endShift:[o.o.required],googleAddress:[o.o.required,o.o.minLength(s.nameMinLength),o.o.maxLength(s.nameMaxLength)],noSpace:[o.o.required,o.o.pattern(i.a.noSpace)],date:[],regNo:[o.o.required,o.o.minLength(s.regNoMinLength),o.o.maxLength(s.regNoMaxLength)]}}return e.prototype.matchPassword=function(e){var t=e.get("password").value,n=e.get("confirmPassword").value;t&&n&&(e.get("confirmPassword").setErrors(null),t!==n?e.get("confirmPassword").setErrors({matchPassword:!0}):t===n&&e.get("confirmPassword").errors&&(delete e.get("confirmPassword").errors.matchPassword,0===Object.keys(e.get("confirmPassword").errors).length&&e.get("confirmPassword").setErrors(null)))},e.prototype.getControl=function(e,t){void 0===t&&(t=!0);var n=this.VALIDATION[e].slice();return t&&("checkbox"===e?n.splice(0,0,o.o.requiredTrue):n.splice(0,0,o.o.required)),["",o.o.compose(n)]},e.prototype.getFilterFormControls=function(e){for(var t={},n=0,a=e;n<a.length;n++){t[a[n]]=[null]}return t},e=a.__decorate([Object(r.Injectable)({providedIn:"root"}),a.__metadata("design:paramtypes",[])],e)}()}}]);