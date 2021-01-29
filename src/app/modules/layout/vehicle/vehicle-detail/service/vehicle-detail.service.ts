import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { VEHICLE_DETAIL,BLOCK_VEHICLE, CAB } from '../../../../../constant/urls';
// status -- satyam
import { COMMON_MESSAGES, CAB_ASSIGNED } from '../../../../../constant/messages';
import { UtilityService } from '../../../../shared/services/utility.service';

@Injectable()
export class VehicleDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getCabDetail(vehicleId) {
    return this._http.get<Cab.Detail>(VEHICLE_DETAIL, { vehicleId });
  }
  // satyam -- status
  async changeStatus(body, isAssigned) {
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
