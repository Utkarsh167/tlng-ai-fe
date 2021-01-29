import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { VehicleAddService } from '../service/vehicle-add.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VEHICLE } from '../../../../../constant/absolute-routes';
import { distinctUntilChanged, debounceTime, } from 'rxjs/operators';
import { invalidFileError, invalidFileSize } from '../../../../../constant/messages';
import { FUEL_TYPE, TRANSMISSION_TYPE, CAR_TYPE, RADIO_OPTION, getFileName, MAX_VEHICLE_LIMIT } from '../../../../../constant/app-constant';
import { onSelectFile } from '../../../../../constant/file-input';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES, MAXIMUM_LIMIT } from '../../../../../constant/messages';
import { Pagination } from "../../../../../models/pagination";

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VehicleAddComponent extends Pagination implements OnInit {

  cabForm: FormGroup;
  cabId: string;
  cabDetail: Cab.Detail;
  vendors: Vendor.Detail[] = [];
  filterForm: FormGroup;
  selectedVendorId: string;
  fuelType = FUEL_TYPE;
  transmissionType = TRANSMISSION_TYPE;
  carType = CAR_TYPE;
  radioOption = RADIO_OPTION;
  vendorSearchConfig: any;
  isSubUniqueMsg: string;
  isBadgeUniqueMsg: string;

  // Added medicalCabValue, selected - Shivakumar A
  // medicalCabValue: string;
  selected = '';

  containers = [];

  vehicleNameArray = [];
  vehicleTypeArray = [];
  vehicleRegNoArray = [];
  vehicleData = [];
  employeeData: any;
  employeeSearchData: any;
  constructor(
    private _cabAddService: VehicleAddService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _uitilityService: UtilityService,

  ) {
    super();
    this.createForm();
    this.createFilterForm();

    // Assign value to medicalCabValue - Shivakumar A
  }

  // Added assignMedicalCabSymbol - Shivakumar A
  // assignMedicalCabSymbol(data) {
  //   if (data === this.medicalCabValue) {
  //     this.selected = 'medical_cab_symbol';
  //   } else {
  //     this.selected = '';
  //   }
  // }

  ngOnInit() {
    this.cabId = this._route.snapshot.params.cabId;
    if (this.cabId) {
      this.getCabDetail();
      // let DOM elements load 
      setTimeout(() => {
        this.editVehicleDiv();
      }, 1000)
    }
    else {
      // this.validateRegNo();
      // this.validateBadgeNo();
      this.containers.push(this.containers.length);

    }

  }

  createFilterForm() {
    this.filterForm = this._cabAddService.getFilterForm();
  }

  addVehicleDiv() {
    if (this.containers.length != MAX_VEHICLE_LIMIT) {

      if (this.containers.length > 0) {

        let name = <HTMLInputElement>document.getElementsByName("vehicleName")[this.containers.length - 1];
        let reg_no = <HTMLInputElement>document.getElementsByName("registrationNo")[this.containers.length - 1];

        if (name.value == "" || name.value == null || reg_no.value == "" || reg_no.value == null || this.cabForm.controls["type" + (this.containers.length - 1)].invalid) {
          return;
        } else {
          this.containers.push(this.containers.length);
        }

      } else {
        this.containers.push(this.containers.length);

      }
    } else {
      this._uitilityService.showAlert(MAXIMUM_LIMIT);
    }

  }

  removeVehicleDiv(itemIndex) {
    let index = this.containers.indexOf(itemIndex);
    this.containers.splice(index, 1);
    this.vehicleData.splice(index, 1);
    console.log(this.vehicleData);

  }

  type(data) {
    this.vehicleTypeArray.push(data.value)
  }


  editVehicleDiv() {
    this.cabForm.controls["vehicleName"].setValue(this.cabDetail.modal)
    this.cabForm.controls["registrationNo"].setValue(this.cabDetail.regNo);
    this.cabForm.controls["type0"].setValue(this.cabDetail.vehicleType);

  }

  onAdd() {
    this.vehicleData.length = 0;
    this.vehicleNameArray.length = 0;
    this.vehicleRegNoArray.length = 0;
    for (let i = 0; i < this.containers.length; i++) {
      let x = <HTMLInputElement>document.getElementsByName("vehicleName")[i];
      this.vehicleNameArray.push(x.value);
    }

    for (let i = 0; i < this.containers.length; i++) {
      let x = <HTMLInputElement>document.getElementsByName("registrationNo")[i];
      this.vehicleRegNoArray.push(x.value);
    }
    for (let i = 0; i < this.containers.length; i++) {

      let formData = {
        modal: this.vehicleNameArray[i],
        vehicleType: this.vehicleTypeArray[i],
        regNo: this.vehicleRegNoArray[i]

      }
      this.vehicleData.push(formData);
    }

  }

  searchEmp(event) {
    this.search = event;
    this.resetPages();;
    this.getEmployees()
  }

  getEmployees() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      limit: 10
    };
    this._cabAddService.getEmployees(data).subscribe(
      response => {
        this.employeeSearchData = response.data.userList;
        this.total = response.data.totalCount;
      },
      err => {}
    );
  }

  /********  Validate registration number is unique or not ********/
  validateRegNo() {
    this.cabForm.controls.registrationNo.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(res => {
      if (res && res.length >= 3) {
        this.checkRegistrationUnique(res);
      }
    });
  }
  /***********  END   ************/

  /***********  For checking registration number is unique or not  ************/
  checkRegistrationUnique(data: string) {
    let value = data.trim();
    this._cabAddService.checkRegistrationUnique({ registrationNo: value }).subscribe(resp => {
      if (resp && resp.statusCode == 200) {
        this.isSubUniqueMsg = null;
      }
      else if (resp && resp.statusCode == 400) {
        this.cabForm.controls['registrationNo'].setErrors({ 'incorrect': true });
        this.isSubUniqueMsg = "Registration number must be unique";
      }
    })
  }
  /***********  END   ************/


  /********  Validate badge number is unique or not ********/
  validateBadgeNo() {
    this.cabForm.controls.routeNo.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(res => {
      if (res && res.length >= 3) {
        this.checkBadgeUnique(res);
      }
    });
  }
  /***********  END   ************/

  /***********  For checking badge number is unique or not  ************/
  checkBadgeUnique(data: string) {
    let value = data.trim();
    this._cabAddService.checkBadgeUnique({ routeNo: value }).subscribe(resp => {
      if (resp && resp.statusCode == 200) {
        this.isBadgeUniqueMsg = null;
      }
      else if (resp && resp.statusCode == 400) {
        this.cabForm.controls['routeNo'].setErrors({ 'incorrect': true });
        this.isBadgeUniqueMsg = "Badge number must be unique";
      }
    })
  }
  /***********  END   ************/

  createForm() {
    this.cabForm = this._cabAddService.createCabForm();
  }
  trimColor() {
    this.getControl('color').setValue(this.getControl('color').value.trim());
  }
  // async uploadFiles() {
  //   try {
  //     let files = [];
  //     for (let item in this.docFiles) {
  //       files.push(this.docFiles[item]);
  //     }
  //     return await this._cabAddService.
  //       uploadFiles(files);
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }

  // searchVendor() {
  //   this.cabForm.controls.vendorId.valueChanges.pipe(
  //     distinctUntilChanged(),
  //     debounceTime(500),
  //     tap(x => {
  //       if (typeof x === 'string') {
  //         if (!x.trim()) {
  //           this.vendors = [];
  //         } else if (x.trim().length < 3) {
  //           this.vendors = this.vendors.filter(item => item.name.indexOf(x.trim()) >= 0)
  //         }
  //       }
  //     }),
  //     filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 3)),
  //     switchMap(data => this._cabAddService.searchVendor(data))
  //   ).subscribe(
  //     response => {
  //       this.vendors = response.data;
  //     }
  //   )
  // }

  searchVendor() {
    this._cabAddService.searchVendor().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.vendors = response.data;
      }
    })
  }


  selectVendor(event) {
    this.selectedVendorId = event.option.value._id;
    // this.getControl('vendorId').setValue(event.option.value.name)
  }

  getCabDetail() {
    this._cabAddService.getCabDetail(this.cabId).subscribe(
      response => {
        this.cabDetail = response.data;
        this.employeeData = response["data1"];
         console.log(this.cabDetail)
        if (this.cabId) {
          this.containers.push(this.containers.length);
          this.cabForm.controls["employeeId"].disable();
        }

        this.patchValue(response.data);
      }, err => {
        this._router.navigate([VEHICLE]);
      }
    )
  }

  patchValue(data) {
    //console.log(data);
    let formValue = {
      // "vehicleName": data.cabModel,
      // "registrationNo": data.registrationNo,
      // "type": data.type,
      "employeeId": this.employeeData.employeeId,

    };
    // let docs = {
    //   "aggrementCopy": data.aggrementCopy?this.getFileName(data.aggrementCopy):'',
    //   "companyIssuance": data.companyIssuance?this.getFileName(data.companyIssuance):'',
    //   "rgsCertificate": data.rgsCertificate?this.getFileName(data.rgsCertificate):'',
    //   "fitnessCertificate": data.fitnessCertificate?this.getFileName(data.fitnessCertificate):'',
    //   "roadTax": data.roadTax?this.getFileName(data.roadTax):'',
    //   "insurance": data.insurance?this.getFileName(data.insurance):'',
    //   "statePermitForm": data.statePermitForm?this.getFileName(data.statePermitForm):'',
    //   "allIndiaPermitForm": data.allIndiaPermitForm?this.getFileName(data.allIndiaPermitForm):'',
    //   "cabImage": data.cabImage?this.getFileName(data.cabImage):''
    // };

    // for (let item in docs) {
    //   this.docs[item] = data[item];
    // }
    // this.selectedVendorId = data.vendorId;
    this.cabForm.patchValue(formValue);
  }

  getControl(control) {
    return this.cabForm.controls[control];
  }

  getFileName(file) {
    return getFileName(file)
  }

  async addCab() {
    let data = { employeeId: this.cabForm.controls["employeeId"].value, vehicles: [] };

    if (this.cabForm.controls["employeeId"].invalid || this.cabForm.controls["vehicleName"].invalid || this.cabForm.controls["registrationNo"].invalid || this.cabForm.controls["type0"].invalid || this.cabForm.disabled) {
      return;
    }

    if (this.vehicleData.length == 0) {
      return;
    }

    this.cabForm.disable();

    if (this.cabId) {
      data['vehicleId'] = this.cabId;
      data['modal'] = this.vehicleData[0].modal;
      data['regNo'] = this.vehicleData[0].regNo;
      data['vehicleType'] = this.cabForm.controls["type0"].value

    } else {
      data.vehicles = this.vehicleData;
    }
    console.log(data);
    console.log(this.vehicleData)

    if (this.cabId) {

      this._cabAddService.editCab(data).subscribe(
        response => {
          this._router.navigate([VEHICLE]);
        }, err => {
          this.cabForm.enable();
        }
      )
    } else {
      this._cabAddService.addCab(data).subscribe(
        response => {
          this._router.navigate([VEHICLE]);
        }, err => {
          this.cabForm.enable();
        }
      )
    }


  }

  /**
 * @description This function is called when user upload any file
 * @param event 
 */
  // async onSelectFile(event, type, format = 'image/jpeg,image/png,application/pdf') {
  //   try {
  //     let result = await onSelectFile(event, format);
  //     this.handleFileSuccess(result, type);
  //   } catch (err) {
  //     if (err.type) {

  //       if (format === 'image/jpeg,image/png,application/pdf') {
  //         this._cabAddService.showAlert(invalidFileError('image/jpeg,image/png images and pdf'));
  //       } else {
  //         this._cabAddService.showAlert(invalidFileError());
  //       }

  //     } else if (err.size) {
  //       this._cabAddService.showAlert(invalidFileSize())
  //     }
  //   }
  // }

  // handleFileSuccess(result, type) {
  //   this.docFiles[type] = result.file;
  //   this.docs[type] = result.url;
  //   this.cabForm.controls[type].setValue(result.name);
  // }

}
