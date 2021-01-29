import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_LIST } from '../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class EntryLogArchiveService {

  constructor(
    private _http: HttpService,
  ) { }

  getDrivers(data) {
    return this._http.get<Driver.List>(USER_LIST, data);
  }

}
