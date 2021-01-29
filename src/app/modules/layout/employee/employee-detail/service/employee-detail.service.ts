import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_DETAIL,USER_LIST, BLOCK_USER, USER, UPLOAD_BULK_EMP, COMPANY_SHIFT  } from '../../../../../constant/urls';
// status - detail page -- satyam
import { COMMON_MESSAGES, CAB_ASSIGNED } from '../../../../../constant/messages';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CAB_LIST, BLOCK_VEHICLE, CAB, VENDOR, BULK_CABUPLOAD, BULK_VEHICLE, VEHICLE_LIST } from '../../../../../constant/urls';
@Injectable()
export class EmployeeDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getEmployeeDetail(userId) {
    return this._http.get(USER_DETAIL, { userId });
  }
  // status - detail page -- satyam
  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Employee')
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(USER + body.userId).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Employee'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  async changeVehicleStatus(body, isAssigned) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: `${isAssigned && body.status !== 'unblocked' ? CAB_ASSIGNED : ''}${COMMON_MESSAGES[status].confirm('Vehicle')}`
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(`${CAB}/${body.cabId}`).toPromise() :
          this._http.post(BLOCK_VEHICLE + body.cabId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Vehicle'))
        return Promise.resolve(response);
      } else {
        return Promise.reject();
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }

  
}
