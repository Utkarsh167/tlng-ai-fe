(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"1h/C":function(e,t){e.exports='@charset "UTF-8";\n.form_filed_wrapper_details {\n  margin: 0 0 40px;\n}\n.flex_row {\n  display: flex;\n  margin: 0 -10px;\n  align-items: center;\n}\n.breadcrumb {\n  width: 100%;\n  padding: 5px 15px;\n}\n.breadcrumb li {\n  display: inline-block;\n}\n.breadcrumb li a {\n  color: #006CB8;\n  text-decoration: none;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 400;\n  outline: none;\n}\n.breadcrumb li a:before {\n  padding: 0 5px;\n  color: #B7BEC1;\n  content: "/ ";\n}\n.breadcrumb li a:after {\n  content: "/\xa0";\n  padding: 0 2px;\n  color: #A2ABAE;\n}\n.breadcrumb li a.active {\n  color: #262c2d;\n  cursor: default;\n}\n.breadcrumb li a.active:after, .breadcrumb li a.active:before {\n  display: none;\n}\n.breadcrumb li:first-child a:before, .breadcrumb li:first-child a:after {\n  display: none;\n}\n.btn_wrapper li {\n  flex-flow: row;\n}\n.btn_wrapper li button {\n  margin: 0 15px;\n}\n.addVehicleHeader {\n  background-color: whitesmoke;\n  margin-bottom: 40px;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  padding-left: 20px;\n}\n.alignRight {\n  margin-left: auto;\n}\n.flex {\n  display: flex;\n}\n.addVehicleBorder {\n  border-style: solid;\n  border-width: thin;\n  border-color: #000000;\n}\nbutton.mat-raised-button {\n  box-shadow: none !important;\n  border: 1px solid #0069FF !important;\n  min-width: 104px !important;\n}'},"4epT":function(e,t,n){"use strict";n.d(t,"a",function(){return f});var a=n("CcnG"),i=n("K9Ia"),o=n("mrSG"),s=n("n6gG"),r=n("Wf4p"),l=n("Ip0R"),p=n("UodH"),c=n("uGex"),d=n("v9Dh"),u=function(){function e(){this.changes=new i.a,this.itemsPerPageLabel="Items per page:",this.nextPageLabel="Next page",this.previousPageLabel="Previous page",this.firstPageLabel="First page",this.lastPageLabel="Last page",this.getRangeLabel=function(e,t,n){if(0==n||0==t)return"0 of "+n;var a=e*t;return a+1+" - "+(a<(n=Math.max(n,0))?Math.min(a+t,n):a+t)+" of "+n}}return e.decorators=[{type:a.Injectable,args:[{providedIn:"root"}]}],e.ngInjectableDef=Object(a["\u0275\u0275defineInjectable"])({factory:function(){return new e},token:e,providedIn:"root"}),e}();var g={provide:u,deps:[[new a.Optional,new a.SkipSelf,u]],useFactory:function(e){return e||new u}},m=(function(){}(),function(){return function(){}}()),h=function(e){function t(t,n){var i=e.call(this)||this;return i._intl=t,i._changeDetectorRef=n,i._pageIndex=0,i._length=0,i._pageSizeOptions=[],i._hidePageSize=!1,i._showFirstLastButtons=!1,i.page=new a.EventEmitter,i._intlChanges=t.changes.subscribe(function(){return i._changeDetectorRef.markForCheck()}),i}return Object(o.__extends)(t,e),Object.defineProperty(t.prototype,"pageIndex",{get:function(){return this._pageIndex},set:function(e){this._pageIndex=Math.max(Object(s.f)(e),0),this._changeDetectorRef.markForCheck()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"length",{get:function(){return this._length},set:function(e){this._length=Object(s.f)(e),this._changeDetectorRef.markForCheck()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pageSize",{get:function(){return this._pageSize},set:function(e){this._pageSize=Math.max(Object(s.f)(e),0),this._updateDisplayedPageSizeOptions()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pageSizeOptions",{get:function(){return this._pageSizeOptions},set:function(e){this._pageSizeOptions=(e||[]).map(function(e){return Object(s.f)(e)}),this._updateDisplayedPageSizeOptions()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hidePageSize",{get:function(){return this._hidePageSize},set:function(e){this._hidePageSize=Object(s.c)(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"showFirstLastButtons",{get:function(){return this._showFirstLastButtons},set:function(e){this._showFirstLastButtons=Object(s.c)(e)},enumerable:!0,configurable:!0}),t.prototype.ngOnInit=function(){this._initialized=!0,this._updateDisplayedPageSizeOptions(),this._markInitialized()},t.prototype.ngOnDestroy=function(){this._intlChanges.unsubscribe()},t.prototype.nextPage=function(){if(this.hasNextPage()){var e=this.pageIndex;this.pageIndex++,this._emitPageEvent(e)}},t.prototype.previousPage=function(){if(this.hasPreviousPage()){var e=this.pageIndex;this.pageIndex--,this._emitPageEvent(e)}},t.prototype.firstPage=function(){if(this.hasPreviousPage()){var e=this.pageIndex;this.pageIndex=0,this._emitPageEvent(e)}},t.prototype.lastPage=function(){if(this.hasNextPage()){var e=this.pageIndex;this.pageIndex=this.getNumberOfPages()-1,this._emitPageEvent(e)}},t.prototype.hasPreviousPage=function(){return this.pageIndex>=1&&0!=this.pageSize},t.prototype.hasNextPage=function(){var e=this.getNumberOfPages()-1;return this.pageIndex<e&&0!=this.pageSize},t.prototype.getNumberOfPages=function(){return this.pageSize?Math.ceil(this.length/this.pageSize):0},t.prototype._changePageSize=function(e){var t=this.pageIndex*this.pageSize,n=this.pageIndex;this.pageIndex=Math.floor(t/e)||0,this.pageSize=e,this._emitPageEvent(n)},t.prototype._nextButtonsDisabled=function(){return this.disabled||!this.hasNextPage()},t.prototype._previousButtonsDisabled=function(){return this.disabled||!this.hasPreviousPage()},t.prototype._updateDisplayedPageSizeOptions=function(){this._initialized&&(this.pageSize||(this._pageSize=0!=this.pageSizeOptions.length?this.pageSizeOptions[0]:50),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),-1===this._displayedPageSizeOptions.indexOf(this.pageSize)&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort(function(e,t){return e-t}),this._changeDetectorRef.markForCheck())},t.prototype._emitPageEvent=function(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})},t.decorators=[{type:a.Component,args:[{selector:"mat-paginator",exportAs:"matPaginator",template:'<div class="mat-paginator-outer-container"><div class="mat-paginator-container"><div class="mat-paginator-page-size" *ngIf="!hidePageSize"><div class="mat-paginator-page-size-label">{{_intl.itemsPerPageLabel}}</div><mat-form-field *ngIf="_displayedPageSizeOptions.length > 1" [color]="color" class="mat-paginator-page-size-select"><mat-select [value]="pageSize" [disabled]="disabled" [aria-label]="_intl.itemsPerPageLabel" (selectionChange)="_changePageSize($event.value)"><mat-option *ngFor="let pageSizeOption of _displayedPageSizeOptions" [value]="pageSizeOption">{{pageSizeOption}}</mat-option></mat-select></mat-form-field><div *ngIf="_displayedPageSizeOptions.length <= 1">{{pageSize}}</div></div><div class="mat-paginator-range-actions"><div class="mat-paginator-range-label">{{_intl.getRangeLabel(pageIndex, pageSize, length)}}</div><button mat-icon-button type="button" class="mat-paginator-navigation-first" (click)="firstPage()" [attr.aria-label]="_intl.firstPageLabel" [matTooltip]="_intl.firstPageLabel" [matTooltipDisabled]="_previousButtonsDisabled()" [matTooltipPosition]="\'above\'" [disabled]="_previousButtonsDisabled()" *ngIf="showFirstLastButtons"><svg class="mat-paginator-icon" viewBox="0 0 24 24" focusable="false"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg></button> <button mat-icon-button type="button" class="mat-paginator-navigation-previous" (click)="previousPage()" [attr.aria-label]="_intl.previousPageLabel" [matTooltip]="_intl.previousPageLabel" [matTooltipDisabled]="_previousButtonsDisabled()" [matTooltipPosition]="\'above\'" [disabled]="_previousButtonsDisabled()"><svg class="mat-paginator-icon" viewBox="0 0 24 24" focusable="false"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button> <button mat-icon-button type="button" class="mat-paginator-navigation-next" (click)="nextPage()" [attr.aria-label]="_intl.nextPageLabel" [matTooltip]="_intl.nextPageLabel" [matTooltipDisabled]="_nextButtonsDisabled()" [matTooltipPosition]="\'above\'" [disabled]="_nextButtonsDisabled()"><svg class="mat-paginator-icon" viewBox="0 0 24 24" focusable="false"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button> <button mat-icon-button type="button" class="mat-paginator-navigation-last" (click)="lastPage()" [attr.aria-label]="_intl.lastPageLabel" [matTooltip]="_intl.lastPageLabel" [matTooltipDisabled]="_nextButtonsDisabled()" [matTooltipPosition]="\'above\'" [disabled]="_nextButtonsDisabled()" *ngIf="showFirstLastButtons"><svg class="mat-paginator-icon" viewBox="0 0 24 24" focusable="false"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg></button></div></div></div>',styles:[".mat-paginator{display:block}.mat-paginator-outer-container{display:flex}.mat-paginator-container{display:flex;align-items:center;justify-content:flex-end;min-height:56px;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-paginator-page-size{margin-right:0;margin-left:8px}.mat-paginator-page-size-label{margin:0 4px}.mat-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.mat-paginator-page-size-select.mat-form-field-appearance-outline{width:64px}.mat-paginator-page-size-select.mat-form-field-appearance-fill{width:64px}.mat-paginator-range-label{margin:0 32px 0 24px}.mat-paginator-range-actions{display:flex;align-items:center}.mat-paginator-icon{width:28px;fill:currentColor}[dir=rtl] .mat-paginator-icon{transform:rotate(180deg)}"],inputs:["disabled"],host:{class:"mat-paginator"},changeDetection:a.ChangeDetectionStrategy.OnPush,encapsulation:a.ViewEncapsulation.None}]}],t.ctorParameters=function(){return[{type:u},{type:a.ChangeDetectorRef}]},t.propDecorators={color:[{type:a.Input}],pageIndex:[{type:a.Input}],length:[{type:a.Input}],pageSize:[{type:a.Input}],pageSizeOptions:[{type:a.Input}],hidePageSize:[{type:a.Input}],showFirstLastButtons:[{type:a.Input}],page:[{type:a.Output}]},t}(Object(r.z)(Object(r.B)(m))),f=function(){function e(){}return e.decorators=[{type:a.NgModule,args:[{imports:[l.c,p.a,c.a,d.a],exports:[h],declarations:[h],providers:[g]}]}],e}()},DUAg:function(e,t){e.exports='<div class="custom_container">\n    <div class="white_wrapper">\n        <h2 class="heading">Employee Detail</h2>\n        <div class="flex_row">\n            <ul class="breadcrumb">\n                <li>\n                    <a href="javascript:void(0)">Home</a>\n                </li>\n                <li>\n                    <a routerLink="/admin/employees/list">Employee &nbsp;</a>\n                </li>\n                <li>\n                    <a href="javascript:void(0)" class="active">Detail</a>\n                </li>\n            </ul>\n        </div>\n        <div class="form_wrapper" *ngIf="employee">\n\n            <div class="flex_row">\n                <div class="flex_col_sm_5">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Employee Name</label>\n                        <span class="show_label">{{employee?.name}}</span>\n                    </div>\n                </div>\n\n                <div class="flex_col_sm_5">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Employee ID</label>\n                        <span class="show_label">{{employee?.employeeId}}</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class="flex_row">\n\n              <div class="flex_col_sm_5">\n                <div class="form_filed_wrapper_details">\n                    <label class="form_label">Email</label>\n                    <span class="show_label">{{employee?.email}}</span>\n                </div>\n            </div>\n            \n              <div class="flex_col_sm_5">\n                <div class="form_filed_wrapper_details">\n                    <label class="form_label">Company Location</label>\n                    <span class="show_label">{{employee?.companyLocationName}}</span>\n                </div>\n            </div>\n\n                \n            </div>\n\n            <div class="flex_row">\n                \x3c!-- <div class="flex_col_sm_5">\n                    <div class="form_filed_wrapper_details">\n                        <label class="form_label">Registration Date</label>\n                        <span class="show_label">{{employee?.created | date: \'dd/MM/yyyy\'}}</span>\n                    </div>\n                </div> --\x3e\n\n               \n            </div>\n\n            \n\n            <div>\n\n                <div class="flex_row addVehicleHeader">\n\n                    <div class="flex_col_sm_5">\n                        <div>\n                            <h3>Vehicles</h3>\n                        </div>\n                    </div>\n\n                    <div class="flex_col_sm_5 flex">\n\n                        <div class="alignRight">\n                            \x3c!-- <button mat-raised-button type="button">\n                                <mat-icon>add</mat-icon> Add Vehicle\n                            </button> --\x3e\n                        </div>\n\n                    </div>\n                </div>\n\n\n\n                <div class="white_wrapper">\n                    <table\n                      mat-table\n                      [dataSource]="vehicles"\n                      class="mat-elevation-z8"\n                    >\n                      <ng-container matColumnDef="position">\n                        <th mat-header-cell *matHeaderCellDef>No.</th>\n                        <td mat-cell *matCellDef="let element; let i = index">\n                          {{ getSerialNumber(i + 1) }}\n                        </td>\n                      </ng-container>\n                  \n                      <ng-container matColumnDef="regNo">\n                        <th mat-header-cell mat-sort-header *matHeaderCellDef>No. Plate</th>\n                        <td mat-cell *matCellDef="let element">\n                          \x3c!-- <span\n                            class="view_details td-text-wrap"\n                            [routerLink]="[\'EMPLOYEES\' | absolutePath, element._id]" > --\x3e\n                            {{ element?.regNo | checkNull }}\n                          \x3c!-- </span> --\x3e\n                        </td>\n                      </ng-container>\n                  \n                      <ng-container matColumnDef="model">\n                        <th mat-header-cell *matHeaderCellDef>Model</th>\n                        <td mat-cell *matCellDef="let element">\n                          <span class="td-text-wrap">{{ element?.modal | checkNull }}</span>\n                        </td>\n                      </ng-container>\n                  \n                      <ng-container matColumnDef="type">\n                        <th mat-header-cell *matHeaderCellDef>Vehicle Type</th>\n                        <td mat-cell *matCellDef="let element" title="{{ element.email }}">\n                          <span>{{ element.vehicleType | checkNull }}</span>\n                        </td>\n                      </ng-container>\n                  \n                  \n                      <ng-container matColumnDef="created">\n                        <th mat-header-cell mat-sort-header *matHeaderCellDef>\n                          Created\n                        </th>\n                        <td mat-cell *matCellDef="let element">\n                          <span matTooltip="Filters applied" matTooltipPosition="below">{{\n                            element.created  | customDate\n                          }}</span>\n                        </td>\n                      </ng-container>\n                  \n                    \n                      <ng-container matColumnDef="status">\n                        <th mat-header-cell *matHeaderCellDef>Status</th>\n                        <td mat-cell *matCellDef="let element">\n                          <span class="td-text-wrap">\n                            {{ element.status | status | titlecase | checkNull }}\n                          </span>\n                        </td>\n                      </ng-container>\n                  \n                      \x3c!-- Symbol Column --\x3e\n    <ng-container matColumnDef="action">\n      <th mat-header-cell *matHeaderCellDef>Action</th>\n      <td mat-cell *matCellDef="let element">\n        <button mat-button [matMenuTriggerFor]="menu" class="btn-more-menu">\n          <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu #menu="matMenu" xPosition="before">\n          \x3c!-- <button\n            mat-menu-item\n            (click)="\n              changeStatus(\'deleted\', element._id, element.assigned?.length)\n            "\n          >\n            <mat-icon matTooltip="Archive">archive</mat-icon> Archive\n          </button> --\x3e\n          \x3c!-- <button\n            mat-menu-item\n            [routerLink]="[\'EDIT_CAB\' | absolutePath, element._id]"\n          >\n            <mat-icon matTooltip="Edit">edit</mat-icon> Edit\n          </button> --\x3e\n          <button\n          mat-menu-item\n          [ngClass]="element.status === \'blocked\' ? \'ban\' : \'noban\'"\n          (click)="\n          changeVehicleStatus(\n              element.status === \'blocked\' ? \'unblocked\' : \'blocked\',\n              element._id,\n              element.assigned?.length\n            )\n          "\n        >\n          <mat-icon\n            matTooltip="{{\n              element.status === \'blocked\' ? \'Unblock\' : \'Block\'\n            }}"\n          >\n            {{ element.status === "blocked" ? "block" : "block" }}</mat-icon\n          >\n          {{ element.status === "blocked" ? "un-block" : "Block" }}\n        </button>\n        </mat-menu>\n      </td>\n    </ng-container>\n                  \n                      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>\n                      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>\n                    </table>\n                  \n                    <div class="white_wrapper" *ngIf="total === 0">\n                      <h2 class="not-found">No Vehicles Found</h2>\n                    </div>\n                    <div class="white_wrapper" *ngIf="vehicles.data.length">\n                      <mat-paginator\n                        [length]="total"\n                        [pageIndex]="page - 1"\n                        [pageSize]="pageSize"\n                        [pageSizeOptions]="pageOptions"\n                        (page)="changePage($event)"\n                      >\n                      </mat-paginator>\n                    </div>\n                  </div>\n\n\n            \n                  \n\n\n\n            </div>\n\n            \n\n\n            <div class="flex_row">\n                <div class="flex_col_sm_10">\n                    <div class="form_filed_wrapper_details text-center">\n                        <ul class="btn_wrapper">\n                            <li> \n                                \x3c!-- archive-button- satyam --\x3e\n                                \x3c!-- <button mat-raised-button color="primary" (click)="changeStatus(\'deleted\', employee._id)">Archive</button> --\x3e\n                                <button mat-raised-button color="primary"\n                                    (click)="\n                                    changeStatus(\n                                        employee.status === \'blocked\' ? \'unblocked\' : \'blocked\',\n                                        employee._id\n                                    )\n                                    ">\n                                  \n                                    {{ employee.status === "blocked" ? "un-block" : "Block" }}\n                                </button>\n                                <button mat-raised-button [routerLink]="[\'EDIT_EMPLOYEE\'|absolutePath,employee._id]" color="primary">Edit</button> \n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'},RzZf:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var a=n("mrSG"),i=function(){function e(){this.showFilter=!1,this.page=1,this.pageSize=10,this.pageOptions=[10,25,50,100]}return Object.defineProperty(e.prototype,"pageParams",{get:function(){return{pageNo:this.page,limit:this.pageSize}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"searchFilter",{get:function(){return{searchKey:this.search}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sortHeaders",{get:function(){var e={};return this.sortKey&&(e={sortOrder:this.sortType,sortBy:this.sortKey}),e},enumerable:!0,configurable:!0}),e.prototype.confirmPageReload=function(){},e.prototype.allPrams=function(){return a.__assign({},this.pageParams,this.filterOptions,this.searchFilter,this.sortHeaders)},e.prototype.validateDeletion=function(){1!==this.total&&this.total-(this.page-1)*this.pageSize==1&&(this.page--,this.total--)},Object.defineProperty(e.prototype,"validPageOptions",{get:function(){for(var e=this.allPrams(),t={},n=0,a=Object.keys(e);n<a.length;n++){var i=a[n];(e[i]||0===e[i])&&(t[i]=e[i])}return t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageOptionsOnChange",{set:function(e){this.page=e.pageIndex+1,this.pageSize=e.pageSize},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sortOptions",{set:function(e){e.direction?(this.sortKey=e.active,this.sortType="asc"===e.direction?1:-1):(this.sortKey=null,this.sortType=null)},enumerable:!0,configurable:!0}),e.prototype.currentIndex=function(e){return this.page*this.pageSize+e+1},e.prototype.resetPages=function(){this.total=0,this.page=1},e.prototype.resetSearch=function(){this.searchKey=""},e.prototype.getSerialNumber=function(e){return e+(this.validPageOptions.pageNo-1)*this.validPageOptions.limit},e.prototype.changeDateFormat=function(e){for(var t in e)e[t]instanceof Date&&(e[t]=e[t].getTime());return e},e}()},gdGC:function(e,t,n){"use strict";var a=n("mrSG"),i=n("CcnG"),o=n("Ip0R"),s=function(){function e(e){this.datePipe=e}return e.prototype.transform=function(e,t){return e?this.datePipe.transform(e,"dd/MM/yyyy"):"-"},e.ctorParameters=function(){return[{type:o.e}]},e=a.__decorate([Object(i.Pipe)({name:"customDate"}),a.__metadata("design:paramtypes",[o.e])],e)}();n.d(t,"a",function(){return r});var r=function(){function e(){}return e=a.__decorate([Object(i.NgModule)({imports:[o.c],declarations:[s],exports:[s],providers:[o.e]})],e)}()},"s3p+":function(e,t,n){"use strict";n.r(t);var a=n("mrSG"),i=n("CcnG"),o=n("Ip0R"),s=n("FTgb"),r=n("jRgp"),l=n("vblm"),p=n("iiAa"),c=function(){function e(e,t){this._http=e,this._utilityService=t}return e.prototype.getEmployeeDetail=function(e){return this._http.get(r.Z,{userId:e})},e.prototype.changeStatus=function(e){return a.__awaiter(this,void 0,void 0,function(){var t,n,i,o;return a.__generator(this,function(a){switch(a.label){case 0:return a.trys.push([0,5,,6]),t=e.status.toUpperCase(),n={message:l.b[t].confirm("Employee")},[4,this._utilityService.openDialog(n).toPromise()];case 1:return a.sent()?[4,i="DELETED"===t?this._http.delete(r.Y+e.userId).toPromise():this._http.post(r.h+e.userId,{status:e.status}).toPromise()]:[3,3];case 2:return a.sent(),this._utilityService.showAlert(l.b[t].success("Employee")),[2,Promise.resolve(i)];case 3:return[2,Promise.resolve(null)];case 4:return[3,6];case 5:return o=a.sent(),[2,Promise.reject(o)];case 6:return[2]}})})},e.prototype.changeVehicleStatus=function(e,t){return a.__awaiter(this,void 0,void 0,function(){var n,i,o,s;return a.__generator(this,function(a){switch(a.label){case 0:return a.trys.push([0,5,,6]),n=e.status.toUpperCase(),i={message:""+(t&&"unblocked"!==e.status?l.a:"")+l.b[n].confirm("Vehicle")},[4,this._utilityService.openDialog(i).toPromise()];case 1:return a.sent()?[4,o="DELETED"===n?this._http.delete(r.k+"/"+e.cabId).toPromise():this._http.post(r.i+e.cabId,{status:e.status}).toPromise()]:[3,3];case 2:return a.sent(),this._utilityService.showAlert(l.b[n].success("Vehicle")),[2,Promise.resolve(o)];case 3:return[2,Promise.reject()];case 4:return[3,6];case 5:return s=a.sent(),[2,Promise.reject(s)];case 6:return[2]}})})},e.ctorParameters=function(){return[{type:s.a},{type:p.a}]},e=a.__decorate([Object(i.Injectable)(),a.__metadata("design:paramtypes",[s.a,p.a])],e)}(),d=n("ZYCi"),u=n("Oy5v"),g=n("BHnd"),m=function(e){function t(t,n,a){var i=e.call(this)||this;return i._employeeDetailService=t,i._route=n,i._router=a,i.displayedColumns=["position","regNo","model","type","created","status","action"],i.vehicles=new g.a([]),i}return a.__extends(t,e),t.prototype.ngOnInit=function(){this.employeeId=this._route.snapshot.params.employeeId,this.getEmployeeDetail()},t.prototype.getEmployeeDetail=function(){var e=this;this._employeeDetailService.getEmployeeDetail(this.employeeId).subscribe(function(t){t.data||e._router.navigate([u.EMPLOYEES]),e.employee=t.data,e.vehicles.data=t.data1,e.total=e.vehicles.data.length,e.cancelledTripCount=t.data3,e.rescheduleTripCount=t.data2,e.noShowCount=t.data4},function(t){e._router.navigate([u.EMPLOYEES])})},t.prototype.changeStatus=function(e,t){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this._employeeDetailService.changeStatus({status:e,userId:t})];case 1:return n.sent()&&this._router.navigate([u.EMPLOYEES]),[3,3];case 2:return n.sent(),[3,3];case 3:return[2]}})})},t.prototype.changeVehicleStatus=function(e,t,n){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,this._employeeDetailService.changeVehicleStatus({status:e,cabId:t},n)];case 1:return a.sent(),this.getEmployeeDetail(),[3,3];case 2:return a.sent(),[3,3];case 3:return[2]}})})},t.prototype.changePage=function(e){this.pageOptionsOnChange=e,0!=this.total&&this.getEmployeeDetail()},t.ctorParameters=function(){return[{type:c},{type:d.a},{type:d.d}]},t=a.__decorate([Object(i.Component)({selector:"app-employee-detail",template:n("DUAg"),styles:[n("1h/C")]}),a.__metadata("design:paramtypes",[c,d.a,d.d])],t)}(n("RzZf").a),h=n("UodH"),f=n("SMsm"),b=n("FpXt"),_=n("9sDP"),v=n("jLZc"),y=n("mVsa"),x=n("4epT"),P=n("v9Dh"),S=n("gdGC");n.d(t,"EmployeeDetailModule",function(){return w});var w=function(){function e(){}return e=a.__decorate([Object(i.NgModule)({declarations:[m],imports:[o.c,h.a,b.a,_.a,v.a,f.a,g.b,y.a,P.a,x.a,S.a,d.e.forChild([{path:"",component:m}])],providers:[c]})],e)}()}}]);