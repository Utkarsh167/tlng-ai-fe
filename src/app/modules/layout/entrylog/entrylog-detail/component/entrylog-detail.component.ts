import { Component, OnInit } from '@angular/core';
import { EntryLogDetailService } from '../service/entrylog-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRIVER } from '../../../../../constant/absolute-routes';
import { DOCUMENT_TYPES, DRINK_STATUS, RADIO_OPTION, getFileName } from '../../../../../constant/app-constant';

@Component({
  selector: 'app-entrylog-detail',
  templateUrl: './entrylog-detail.component.html',
  styleUrls: ['./entrylog-detail.component.scss']
})
export class EntryLogDetailComponent implements OnInit {

  driver: Driver.Detail;
  driverId: string;

  documentTypes = DOCUMENT_TYPES;
  addressProof: string;
  dlUrl: string;
  leftPalmUrl: string;
  rightPalmUrl: string;

  drinkStatus = DRINK_STATUS;
  radioOptions = RADIO_OPTION;

  constructor(
    private _driverDetailService: EntryLogDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.driverId = this._route.snapshot.params.driverId;
    this.getDriverDetail();
  }

  getDriverDetail() {
    this._driverDetailService.getEntryLogDetail(this.driverId).subscribe(
      response => {
        console.log(response)
        if (!response.data) {
          this._router.navigate([DRIVER]);
        }
        this.driver = response.data[0];

      },
      err => {
        this._router.navigate([DRIVER]);
      }
    )
  }

  getFileName(file) {
    return getFileName(file)
  }
  
  getDrunkStatus(value) {
    return this.drinkStatus.filter(x => x.value == value)[0] ? this.drinkStatus.filter(x => x.value == value)[0].viewValue : '';
  }

  getRadioStatus(value) {
    return this.radioOptions.filter(x => x.value == value)[0] ? this.radioOptions.filter(x => x.value == value)[0].viewValue : '';
  }
  async changeStatus(status, userId) {
    try {
      let data = await this._driverDetailService.changeStatus({ status, userId });
      if (data) {
        this.getDriverDetail();
      }
    } catch (err) {}
  }
}
