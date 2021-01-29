import { Injectable } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CAB_LIST, BLOCK_VEHICLE, CAB, VENDOR, BULK_CABUPLOAD, BULK_VEHICLE, VEHICLE_LIST } from '../../../../../constant/urls';
import { COMMON_MESSAGES, CAB_ASSIGNED } from '../../../../../constant/messages';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class VehicleListService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'vehicleType', 'assigned', 'vendorId','compLocationName']))
  }

  getCabs(data) {
    return this._http.get<Cab.List>(VEHICLE_LIST, data);
  }
  searchVendor(searchKey) {
    return this._http.get<Vendor.Detail[]>(VENDOR, { searchKey }, false);
  }

  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      vehicleType: {
        label: 'Type',
        list: [
          { viewValue: 'Car', value: 'car' },
          { viewValue: 'Bike', value: 'bike' }
        ],
        control: form.controls.vehicleType
      },
      assigned: {
        label: 'Assigned Status',
        list: [
          { viewValue: 'Assigned', value: true },
          { viewValue: 'Unassigned', value: false }
        ],
        control: form.controls.assigned
      },
      compLocationName: {
        label: 'Building',
        list: JSON.parse(localStorage.getItem('buildings')),
        control: form.controls.compLocationName
      },
    }
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

  uploadFile(data) {
    var formData = new FormData();
    formData.append('file', data);
    let apiType = 'post';
    return this._http[apiType](BULK_VEHICLE, formData).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPLOADED']('File'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }
}
