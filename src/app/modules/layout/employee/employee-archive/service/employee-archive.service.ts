import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_LIST, BLOCK_USER, USER, UPLOAD_BULK_EMP, COMPANY_SHIFT } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { UtilityService } from '../../../../shared/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeArchiveService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService

  ) { }

  getArchivedEmployees(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }

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
}
