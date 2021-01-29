import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_DETAIL, DETAILS_SUBADMIN, DELETE_SUBADMIN, BLOCK_SUBADMIN } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class SubAdminDetailService {

  constructor(
    private _http: HttpService,
    private _uitilityService: UtilityService
  ) { }

  getDetail(userId) {
    return this._http.get<any>(DETAILS_SUBADMIN + userId);
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Sub Admin')
      }
      let success = await this._uitilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          await this._http.delete(DELETE_SUBADMIN + body.userId).toPromise() :
          await this._http.post(BLOCK_SUBADMIN + body.userId, { status: body.status }).toPromise();
        response;
        this._uitilityService.showAlert(COMMON_MESSAGES[status].success('Sub Admin'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
