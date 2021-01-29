import { Component, OnInit } from "@angular/core";
import { EntryLogAddService } from "../service/entrylog-add.service";
import { FormGroup } from "@angular/forms";
import {
  DOCUMENT_TYPES,
  RADIO_OPTION,
  DRINK_STATUS,
  getFileName
} from "../../../../../constant/app-constant";
import { Router, ActivatedRoute } from "@angular/router";
import { DRIVER } from "../../../../../constant/absolute-routes";
import { onSelectFile } from "../../../../../constant/file-input";
import {
  invalidFileError,
  invalidFileSize,
  ADD_DRIVER_MESSAGES as messages
} from "../../../../../constant/messages";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CAR_TYPE } from '../../../../../constant/app-constant';

@Component({
  selector: "app-entrylog-add",
  templateUrl: "./entrylog-add.component.html",
  styleUrls: ["./entrylog-add.component.scss"]
})
export class EntryLogAddComponent implements OnInit {
  driverForm: FormGroup;
  radioOptions = RADIO_OPTION;
  driverId: string;
  driverDetail: Driver.Detail;
  minDate: Date;
  isUniqueMsg: string;
  isvehicleId: boolean;
  vehicleInfoLength: any;
  driverImage: string;
  leftPalmUrl: string;
  rightPalmUrl: string;
  addressProof: string;
  dlUrl: string;
  carType = CAR_TYPE;
  driverImageFile: any;
  leftPalmFile: any;
  rightPalmFile: any;
  addressProofFile: any;
  dlFile;
  formValue: any;
  startAt;

  documentTypes = DOCUMENT_TYPES;
  drinkingStatus = DRINK_STATUS;

  constructor(
    private _driverAddService: EntryLogAddService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.driverId = this._route.snapshot.params.driverId;
    this.minDate = new Date();
    if (this.driverId) {
      this.getDriverDetail();
    } else {
      this.validateMobileNo();
    }
  }

  /********  Validate emp no is unique or not ********/
  validateMobileNo() {
    this.driverForm.controls.mobileNo.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (res && res.length >= 3) {
          this.checkDriverNoUnique(res);
        }
      });
  }
  /***********  END   ************/

  /***********  For checking emp no is unique or not  ************/
  checkDriverNoUnique(data: string) {
    this._driverAddService
      .checkDriverNoUnique({ mobileNo: data })
      .subscribe(resp => {
        if (resp && resp.statusCode == 200) {
          this.isUniqueMsg = null;
        } else if (resp && resp.statusCode == 400) {
          this.driverForm.controls["mobileNo"].setErrors({
            incorrect: true
          });
          this.isUniqueMsg = "Mobile Number must be unique";
        }
      });
  }
  /***********  END   ************/

  createForm() {
    this.driverForm = this._driverAddService.createDriverForm();
  }

  getDriverDetail() {
    this._driverAddService.getDriverDetail(this.driverId).subscribe(
      response => {
        this.driverDetail = response.data;
        console.log(this.driverDetail);
        this.patchValue(response.data[0]);
        if(this.driverDetail[0].vehicleInfo) {
          this.isvehicleId = true;
          
        }
        this.startAt = new Date(this.driverDetail[0].userData.guestValidity);
        //  console.log(this.startAt);
      },
      err => {
        this._router.navigate([DRIVER]);
      }
    );
  }

  patchValue(data) {
    if(!data.vehicleId) {
        this.vehicleInfoLength = Object.keys(data.vehicleInfo).length
      if(!data.userData.guestValidity) {
        this.formValue = {
          name: data.vehicleInfo.name,
          vehicleType: data.vehicleInfo.vehicleType,
          guestValidity: undefined,
          entrytype: data.entryType,
          regNo: data.vehicleInfo.regNo,
          modal: data.vehicleInfo.modal,
          purposeOfVisit: data.vehicleInfo.purposeOfVisit,
          visitorId: data.vehicleInfo.visitorId
        };
      
      } else {
        this.formValue = {
          name: data.vehicleInfo.name,
          vehicleType: data.vehicleInfo.vehicleType,
          guestValidity: new Date(data.userData.guestValidity).toDateString(),
          entrytype: data.entryType,
          regNo: data.vehicleInfo.regNo,
          modal: data.vehicleInfo.modal,
          purposeOfVisit: data.vehicleInfo.purposeOfVisit,
          visitorId: data.vehicleInfo.visitorId
        };
      }
    } else{
      if(!data.userData.guestValidity) {
        this.formValue = {
          name: data.userData.name,
          vehicleType: data.vehicleData.vehicleType,
          guestValidity: undefined,
    
          entrytype: data.entryType,
          regNo: data.vehicleData.regNo,
          modal: data.vehicleData.modal,
    
        };
      } else {
        this.formValue = {
          name: data.userData.name,
          vehicleType: data.vehicleData.vehicleType,
          guestValidity: new Date(data.userData.guestValidity).toDateString(),
    
          entrytype: data.entryType,
          regNo: data.vehicleData.regNo,
          modal: data.vehicleData.modal,
    
        };
      }
      
    }
    
    this.driverForm.patchValue(this.formValue);

  }

  getControl(control) {
    return this.driverForm.controls[control];
  }

  async uploadFiles() {
    try {
      return await this._driverAddService.uploadFiles([
        this.driverImageFile,
        this.dlFile,
        this.leftPalmFile,
        this.rightPalmFile,
        this.addressProofFile
      ]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getFileName(file) {
    return getFileName(file);
  }

  async submitForm() {
    // if(this.isvehicleId) {
    //   if (this.driverForm.controls["purposeOfVisit"].invalid || this.driverForm.controls["visitorId"].invalid || this.driverForm.controls["modal"].invalid || this.driverForm.controls["vehicleType"].invalid || this.driverForm.disabled) {
    //     return;
    //   }
    // } else {
    //   if (this.driverForm.controls["modal"].invalid || this.driverForm.controls["vehicleType"].invalid || this.driverForm.disabled) {
    //     return;
    //   }
    // }
    
    const data = { ...this.driverForm.value };
    this.driverForm.disable();
    
    this.addDriver(data);
  }

  addDriver(data) {
    let obj;
    console.log(data);
    console.log(this.driverDetail);
    if(!this.driverDetail[0].vehicleId) {
      // delete data.guestValidity;
      obj = {
        "vehicleInfo": data,
      }
    } else {
     obj = {
        "vehicleData": data,
        "vehicleId": this.driverDetail[0]["vehicleId"],
        "userId": this.driverDetail[0]["userId"],
      }
    }
    
    if (this.driverId) {
      obj["entryLogId"] = this.driverId;
    }
    if(this.driverDetail[0].vehicleId) {
    delete obj.vehicleData.intime;
    delete obj.vehicleData.entrytype;
    delete obj.vehicleData.regNo;
    // delete obj.vehicleData.name;
    }
    console.log(obj)
    this._driverAddService.addDriver(obj).subscribe(
      response => {
        this._router.navigate([DRIVER]);
      },
      err => {
        this.driverForm.enable();
      }
    );
  }
  /**
   * @description This function is called when user upload any file
   * @param event
   */
  async onSelectFile(
    event,
    type,
    format = "image/jpeg,image/png,application/pdf"
  ) {
    try {
      let result = await onSelectFile(event, format);
      this.handleFileSuccess(result, type);
    } catch (err) {
      if (err.type) {
        if (format === "image/jpeg,image/png,application/pdf") {
          this._driverAddService.showAlert(
            invalidFileError("image/jpeg,image/png images and pdf")
          );
        } else {
          this._driverAddService.showAlert(invalidFileError());
        }
      } else if (err.size) {
        this._driverAddService.showAlert(invalidFileSize());
      }
    }
  }

  handleFileSuccess(result, type) {
    switch (type) {
      case this.documentTypes.driverImage: {
        this.driverImage = result.url;
        this.driverImageFile = result.file;
        this.driverForm.controls.profilePicture.setValue(result.name);
        break;
      }
      case this.documentTypes.fullDl: {
        this.dlUrl = result.url;
        this.dlFile = result.file;
        this.driverForm.controls.dl.setValue(result.name);
        break;
      }
      case this.documentTypes.leftPalm: {
        this.leftPalmUrl = result.url;
        this.leftPalmFile = result.file;
        this.driverForm.controls.leftPalm.setValue(result.name);
        break;
      }
      case this.documentTypes.rightPalm: {
        this.rightPalmUrl = result.url;
        this.rightPalmFile = result.file;
        this.driverForm.controls.rightPalm.setValue(result.name);
        break;
      }
      case this.documentTypes.addressProof: {
        // test comment
        this.addressProof = result.url;
        this.addressProofFile = result.file;
        this.driverForm.controls.addressProof.setValue(result.name);
        break;
      }
      default: {
        alert("Wrong Type");
        break;
      }
    }
  }
}
