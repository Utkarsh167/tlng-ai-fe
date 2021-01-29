import { Injectable } from '@angular/core';
import { FormService } from 'src/app/modules/shared/services/form.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
// inout graph added - satyam
import { DASHBOARD, TRIP_HISTORY, OCCUPANCY_VARIATION, MANUAL_ENTRY_LIST, GET_MANUAL_ENTRIES_COUNT, SCOPE_API, SNAPSHOT_API, SNAPSHOT_VACANTS, SNAPSHOT_OCCUPIED, GET_LOCATIONS, INOUT_GRAPH_DATA, DASHBOARD_DATA } from '../../../../../constant/urls';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService
  ) { }

  getAllDashBoardData() {
    return this._http.get<any>(DASHBOARD);
  }

  getTripHistory(data) {
    return this._http.get<any>(TRIP_HISTORY,data);
  }

  getScopeData(data: any) {
    return this._http.post<any>(SCOPE_API, {"user":data.user, "password":data.password, "buildingUrl": data.buildingUrl});
  }

  getSnapshotData(data: any, isLoad) {
    console.log(data);
    return this._http.post<Snapshot.List>(SNAPSHOT_API, {"timestamp":data.timestamp, "user":data.user, "password":data.password, "buildingUrl": data.buildingUrl, "camera_ids":data.cameras,"with_image":data.withImage,"block_id":"","klass":"","with_crops":false}, isLoad);
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

  getManualEntryCount(data) {
    return this._http.get<any>(GET_MANUAL_ENTRIES_COUNT,data);
  }

  getOccupancyVariation(data: any) {
    return this._http.post<any>(OCCUPANCY_VARIATION, {"user":data.user, "password":data.password, "buildingUrl": data.buildingUrl, "camera_ids":data.cameras, "range_from": data.range_from, "range_to": data.range_to});
  }

  getManualEntryList(data, isLoad) {
    return this._http.get<any>(MANUAL_ENTRY_LIST, data,isLoad);
  }
  // inout graph data -- satyam
  getInoutGraphData(data) {
    return this._http.get<any>(INOUT_GRAPH_DATA, data);
  }

  getDashBoard(){
    return this._http.get<any>(DASHBOARD_DATA);
  }
}


