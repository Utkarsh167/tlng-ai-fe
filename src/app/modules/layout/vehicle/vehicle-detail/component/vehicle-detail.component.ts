import { Component, OnInit } from '@angular/core';
import { VehicleDetailService } from '../service/vehicle-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VEHICLE } from '../../../../../constant/absolute-routes';
import { FUEL_TYPE, TRANSMISSION_TYPE, CAR_TYPE, RADIO_OPTION, getFileName } from '../../../../../constant/app-constant';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  cab: Cab.Detail;
  employee: any;
  vehicleId: string;
  fuelType = FUEL_TYPE;
  transmissionType = TRANSMISSION_TYPE;
  carType = CAR_TYPE;
  radioOption = RADIO_OPTION;
  docs = [
    { value: "aggrementCopy", viewValue: 'Aggrement Copy' },
    { value: "companyIssuance", viewValue: 'Company Issuance' },
    { value: "rgsCertificate", viewValue: 'Registration Certificate' },
    { value: "fitnessCertificate", viewValue: 'Fitness Certificate' },
    { value: "roadTax", viewValue: 'Road Tax Experience' },
    { value: "insurance", viewValue: 'Insurance Experience' },
    { value: "statePermitForm", viewValue: 'State Permit Form-47' },
    { value: "allIndiaPermitForm", viewValue: 'All India Permit Form-49' }
  ];
  // Added medicalCabValue, selected - Shivakumar A
  // medicalCabValue: string;
  constructor(
    private _cabDetailService: VehicleDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.vehicleId = this._route.snapshot.params.cabId;
    this.getCabDetail();
     // Assign value to medicalCabValue - Shivakumar A
    //  this.medicalCabValue = CAR_TYPE[4].viewValue;
  }

  getFileName(file) {
    return getFileName(file)
  }

  
  getCabDetail() {
    this._cabDetailService.getCabDetail(this.vehicleId).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([VEHICLE]);
        }
        this.cab = response.data;
        this.employee = response["data1"];
      },
      err => {
        this._router.navigate([VEHICLE]);
      }
    )
  }

  getViewValue(type, value = null) {
    return this[value || type].filter(x => x.value === this.cab[type])[0].viewValue;
  }
  async changeStatus(status, cabId, isAssigned) {
    try {
      await this._cabDetailService.changeStatus({ status, cabId }, isAssigned);
      this._router.navigate([VEHICLE]);
      
    } catch (err) {
    }
  }
}
