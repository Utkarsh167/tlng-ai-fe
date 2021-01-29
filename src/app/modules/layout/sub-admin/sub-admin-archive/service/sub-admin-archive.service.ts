import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { SUBADMIN_LIST, BLOCK_SUBADMIN, DELETE_SUBADMIN } from 'src/app/constant/urls';
import { COMMON_MESSAGES } from 'src/app/constant/messages';

@Injectable({
  providedIn: 'root'
})
export class SubAdminArchiveService {

  constructor(
    private _http: HttpService,
    private _uitilityService: UtilityService) { }

  getAllArchivedSubadmin(data) {
    return this._http.get<any>(SUBADMIN_LIST, data);
  }
}
