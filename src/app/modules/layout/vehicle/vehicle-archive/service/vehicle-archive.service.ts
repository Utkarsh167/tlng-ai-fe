import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CAB_LIST, BLOCK_VEHICLE, CAB, VENDOR, BULK_CABUPLOAD, BULK_VEHICLE, VEHICLE_LIST } from '../../../../../constant/urls';
import { COMMON_MESSAGES, CAB_ASSIGNED } from '../../../../../constant/messages';
@Injectable({
  providedIn: 'root'
})
export class VehicleArchiveService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService

  ) { }

  getCabs(data) {
    return this._http.get<Cab.List>(VEHICLE_LIST, data);
  }

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
