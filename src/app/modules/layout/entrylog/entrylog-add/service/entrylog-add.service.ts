import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { ENTRYLOG_MANUAL_ENTRY, USER_DETAIL, CHECK_DRIVER_NUMBER_UNIQUE, ENTRYLOG_MANUAL_DETAIL, ENTRYLOG_EDIT } from '../../../../../constant/urls';
import { FileUploadService } from '../../../../shared/services/file-upload.service';

@Injectable()
export class EntryLogAddService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _uitilityService: UtilityService,
    private _fileUploadService:FileUploadService
  ) { }

  createDriverForm() {
    return this._formBuilder.group(
      {
        "name": this._formService.getControl('name'),
        "vehicleType": this._formService.getControl('name'),
        "guestValidity": this._formService.getControl('date'),
        "entrytype":this._formService.getControl('name'),
        "regNo": this._formService.getControl('alphaNumeric'),
        "modal": this._formService.getControl('name'),
        "purposeOfVisit": this._formService.getControl('name'),
        "visitorId": this._formService.getControl('alphaNumeric'),

      }
    )
  }


  addDriver(data) {
    let apiType = data.entryLogId?'put':'post';
    return this._http[apiType](ENTRYLOG_EDIT, data).pipe(
      map( 
        response => {
          this._uitilityService.showAlert(COMMON_MESSAGES[data.userId?'UPDATED':'ADDED']('Entry log'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

  checkDriverNoUnique(data: object) {
    return this._http.get<any>(CHECK_DRIVER_NUMBER_UNIQUE, data, false);
  }

  showAlert(message) {
    this._uitilityService.showAlert(message);
  }

  uploadFiles(files) {
    return this._fileUploadService.uploadFiles(files);
  }

  getDriverDetail(entryLogId) {
    return this._http.get<any>(ENTRYLOG_MANUAL_DETAIL+"/"+entryLogId);

  }
}
