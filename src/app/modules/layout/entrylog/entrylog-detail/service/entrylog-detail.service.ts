import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_DETAIL,BLOCK_USER, USER, ENTRYLOG_MANUAL_DETAIL} from '../../../../../constant/urls';
// status -- satyam
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { UtilityService } from '../../../../shared/services/utility.service';

@Injectable()
export class EntryLogDetailService {

  constructor(
    private _http: HttpService,
    private _utilityService: UtilityService

  ) { }


  getEntryLogDetail(entryLogId) {
    return this._http.get<any>(ENTRYLOG_MANUAL_DETAIL+"/"+entryLogId);
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Driver')
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(USER + body.userId).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Driver'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }
}
