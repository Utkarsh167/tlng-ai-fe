import { Component, OnInit } from '@angular/core';
import { NOTIFICATION_AUDIENCE, NOTIFICATION_SCHEDULE } from 'src/app/constant/app-constant'
import { NotificationAddService } from '../service/notification-add.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WEBNOTIFICATION } from 'src/app/constant/absolute-routes';

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.scss']
})
export class NotificationAddComponent implements OnInit {

  notiAudience = NOTIFICATION_AUDIENCE;
  notiSchedule = NOTIFICATION_SCHEDULE;
  notificationForm: FormGroup;
  notificationId: string;
  notificationDetails: any;
  public todayDate:any = new Date();
  constructor(private _notiAdd: NotificationAddService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.notificationId = this._route.snapshot.params.notiId; // getting notification id
    if (this.notificationId) {
      this.getNotificationDetail();
    }
  }

  /**
   Method for getting notification details 
   */
  getNotificationDetail() {
    this._notiAdd.getNotiDetail(this.notificationId).subscribe(
      response => {
        this.notificationDetails = response.data;
        this.patchValue(this.notificationDetails);
      }, err => {
        this._router.navigate([WEBNOTIFICATION]);
      }
    )
  }

  /**
  set value in form
  */
  patchValue(data) {
    let formValue = {
      "title": data.title,
      "audience": data.audience,
      "message": data.message,
      "scheduleType": data.scheduleType,
      "scheduleTime": new Date(data.scheduleTime)
    };
    this.notificationForm.patchValue(formValue);
  }

  /**
   Create Notification form 
   */
  createForm() {
    this.notificationForm = this._notiAdd.createNotificationForm();
    this.notificationForm.controls['scheduleType'].setValue('sendNow');
  }

  /***
    Get all controls
  ***/
  getControl(control) {
    return this.notificationForm.controls[control];
  }


  /**
  Method call when radio button change
  */
  checkSchedule(event) {
    if (event === "sendLater") {
      this.notificationForm.controls['scheduleTime'].setValidators([Validators.required]);
    }
    else if (event === "sendNow") {
      this.notificationForm.controls['scheduleTime'].setValue('');
      this.notificationForm.controls['scheduleTime'].clearValidators();
      this.notificationForm.controls['scheduleTime'].setErrors(null);
      this.notificationForm.updateValueAndValidity();
    }
  }

  /**
  Method call when from is submit
  */
  submitForm() {
    if (this.notificationForm.invalid || this.notificationForm.disabled) {
      return;
    }
    const data = { ...this.notificationForm.value };
    if (data.scheduleType === 'sendLater') {
      data['scheduleTime'] = new Date(data['scheduleTime']).getTime();
    }
    else {
      delete data.scheduleTime;
    }
    if (this.notificationId) {
      data['notificationId'] = this.notificationId;
    }
    this.notificationForm.disable();
    this.addNotification(data);
  }

  addNotification(data) {
    this._notiAdd.addNoti(data).subscribe(
      response => {
        if (response && response.statusCode == 200) {
          this._router.navigate([WEBNOTIFICATION])
        }
      },
      err => {
        this.notificationForm.enable();
      }
    )
  }

}
