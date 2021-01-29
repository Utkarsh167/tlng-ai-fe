import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { GET_ALL_ROSTER, COMPANY_SHIFT, ADMIN_DETAIL, ADD_NOTIFICATION, SCOPE_API, SNAPSHOT_API, SNAPSHOT_VACANTS, SNAPSHOT_OCCUPIED, GET_LOCATIONS } from '../../../../../constant/urls';
import { UtilityService } from '../../../../shared/services/utility.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private http:HttpClient,
    private _utilityService: UtilityService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization': 'Basic c2hvd2Nhc2U6YXVkaWVuY2UtYW5vdGhlci1hcy1mb3J0aA=='
    })
  };

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'shiftName']))
  }

  createSelectForm() {
    return this._formBuilder.group({
      building: this._formService.getControl("dropdown"),
      floor: this._formService.getControl("dropdown"),
      slider: this._formService.getControl("name"),
    })
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Trip Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },

    }
  }

  getAllRoster(data) {
    return this._http.get<any>(GET_ALL_ROSTER, data);
  }

  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }

  getScopeData(data: any) {
    return this._http.post<any>(SCOPE_API, {"user":data.user, "password":data.password, "buildingUrl": data.buildingUrl});
  }

  getSnapshotData(data: any, isLoad) {
    return this._http.post<Snapshot.List>(SNAPSHOT_API, {"timestamp":data.timestamp, "user":data.user, "password":data.password, "buildingUrl": data.buildingUrl, "camera_ids":data.cameras,"with_image":data.withImage,"block_id":data.zone,"klass":"","with_crops":true}, isLoad);
  }

  getVacantData(data: any) {
    return this._http.post<any>(SNAPSHOT_VACANTS, {"timestamp":data.timestamp, "user":data.user, "password":data.password, "buildingUrl": data.buildingUrl});
  }

  getOccupiedData(data: any) {
    return this._http.post<any>(SNAPSHOT_OCCUPIED, {"timestamp":data.timestamp, "user":data.user, "password":data.password, "buildingUrl": data.buildingUrl});
  }

  getLocations() {
    return this._http.get<any>(GET_LOCATIONS);
  }

  downloadVideo(data) {
    return this.http.post<any>('https://showcase-alpha.io.parquery.com/dashboard/api/time_track/video_from_form',data,this.httpOptions);
  }

  sendUserNotification(data) {
    return this._http.post<any>(ADD_NOTIFICATION, data);
  }
  

  getLongDuration() {
    return this._http.get<any>(ADMIN_DETAIL);
  }

}
