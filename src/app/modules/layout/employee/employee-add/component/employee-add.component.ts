import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { EmployeeAddService } from "../service/employee-add.service";
import { FormGroup } from "@angular/forms";
import { GENDERS, MAX_VEHICLE_LIMIT } from "../../../../../constant/app-constant";
import { Router, ActivatedRoute } from "@angular/router";
import { EMPLOYEES, EDIT_EMPLOYEE, EMPLOYEES_LIST } from "../../../../../constant/absolute-routes";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FUEL_TYPE, TRANSMISSION_TYPE, CAR_TYPE, RADIO_OPTION, getFileName } from '../../../../../constant/app-constant';
import { UtilityService } from '../../../../shared/services/utility.service';
import { COMMON_MESSAGES, MAXIMUM_LIMIT } from '../../../../../constant/messages';

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup;
  genders = GENDERS;
  employeeId: string;
  employeeDetail: any;
  allShifts = [];
  isAddress: boolean = false;
  isUniqueMsg: string;
  containers = [];
  carType = CAR_TYPE;
  formValue: Formvalue = new Formvalue();
  vehicleNameArray = [];
  vehicleTypeArray = [];
  vehicleRegNoArray = [];
  vehicleData = [];
  vehicleEditData: any = [];
  flag = false;
  vehicleName: any;
  locations: any;
  removeVehicle = [];
  duplicateEntry = 0;
  constructor(
    private _employeeAddService: EmployeeAddService,
    private _router: Router,
    private _route: ActivatedRoute,
    public zone: NgZone,
    private _uitilityService: UtilityService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.getAllShifts();
    this.employeeId = this._route.snapshot.params.employeeId;
    if (this.employeeId) {
      this.getEmployeeDetail();
      setTimeout(() => {
        this.editVehicleDiv();

      }, 1000)
    } else {
      this.validateMobileNo();
      // this.containers.push(this.containers.length);

    }
    this.getLocations();

  }

  addVehicleDiv() {
    if (this.containers.length != MAX_VEHICLE_LIMIT) {

      if (this.containers.length > 0) {

        let name = <HTMLInputElement>document.getElementsByName("vehicleName")[this.containers.length - 1];
        let reg_no = <HTMLInputElement>document.getElementsByName("registrationNo")[this.containers.length - 1];



        if (name.value == "" || name.value == null || reg_no.value == "" || reg_no.value == null || this.employeeForm.controls["type" + (this.containers.length - 1)].invalid) {
          return;
        } else {
          this.containers.push(this.containers.length);
          console.log(this.containers.length);
        }

      } else {
        this.containers.push(this.containers.length);
        console.log(this.containers.length);

      }
    } else {
      this._uitilityService.showAlert(MAXIMUM_LIMIT);
    }

  }


  editVehicleDiv() {
    this.vehicleEditData.forEach((element, index) => {
      this.employeeForm.controls["vehicleName" + index].setValue(element.modal);
      this.employeeForm.controls["type" + index].setValue(element.vehicleType);
      this.employeeForm.controls["registrationNo" + index].setValue(element.regNo);

    });
  }

  removeVehicleDiv(itemIndex) {
    let index = this.containers.indexOf(itemIndex);
    console.log(itemIndex);
    console.log(index);
    console.log(this.vehicleEditData.length);
    console.log(this.containers.length);
    console.log(this.employeeId);
    if (this.employeeId && index < this.vehicleEditData.length) {

      this.changeStatus("blocked", this.vehicleEditData[itemIndex]._id, false, index);
      
    } else {
      // this.removeVehicle.push(index);
      console.log(this.containers);
      // console.log(this.vehicleData);
      this.containers.splice(index, 1);
      // this.vehicleData.splice(index, 1);
      console.log(this.containers);
      // console.log(this.vehicleData);
    }
  }

  // type(data) {
  //   this.vehicleTypeArray.push(data.value);
  // }

  onAdd() {
    console.log("check");
    this.vehicleData.length = 0;
    this.vehicleNameArray.length = 0;
    this.vehicleRegNoArray.length = 0;
    this.vehicleTypeArray.length = 0;
    this.duplicateEntry = 0;

    if (this.employeeId) {
      // for (let i = 0; i < this.containers.length; i++) {
      //   this.vehicleNameArray.push(this.employeeForm.controls["vehicleName" + i].value);
      //   this.vehicleRegNoArray.push(this.employeeForm.controls["registrationNo" + i].value);
      //   this.vehicleTypeArray.push(this.employeeForm.controls["type" + i].value);
      //   console.log(this.employeeForm.controls["type" + i].value);
      //   let formData = {
      //     modal: this.vehicleNameArray[i],
      //     vehicleType: this.vehicleTypeArray[i],
      //     regNo: this.vehicleRegNoArray[i],
      //     vehicleId: this.vehicleEditData[i]
      //   }
      //   this.vehicleData.push(formData);

      // }
      for(let i = 0; i < this.vehicleEditData.length; i++) {
        let x = this.employeeForm.controls["vehicleName" + i].value;
        let y = this.employeeForm.controls["registrationNo" + i].value;
        let z = this.employeeForm.controls["type" + i].value;
        this.vehicleNameArray.push(x);
        this.vehicleRegNoArray.push(y);
        this.vehicleTypeArray.push(z);
        let formData = {
          modal: x,
          vehicleType: z,
          regNo: y,
          vehicleId: this.vehicleEditData[i]._id
        }
        this.vehicleData.push(formData);
      }
      for (let j = this.vehicleEditData.length; j < this.containers.length; j++){
        let x = this.employeeForm.controls["vehicleName" + this.containers[j]].value;
        let y = this.employeeForm.controls["registrationNo" + this.containers[j]].value.toUpperCase();
        let z = this.employeeForm.controls["type" + this.containers[j]].value;
        if (this.vehicleRegNoArray.includes(y)){
          this._uitilityService.errorAlert({error: {message:"Please enter unique registration no" }});
          this.duplicateEntry = 1;
          return 
        }
        this.vehicleNameArray.push(x);
        this.vehicleRegNoArray.push(y);
        this.vehicleTypeArray.push(z);
        let formData = {
          modal: x,
          vehicleType: z,
          regNo: y
        }
        this.vehicleData.push(formData);
      }
    } else {
      for (let i of this.containers){
        let x = this.employeeForm.controls["vehicleName" + i].value;
        let y = this.employeeForm.controls["registrationNo" + i].value.toUpperCase();
        let z = this.employeeForm.controls["type" + i].value;
        this.vehicleNameArray.push(x);
        if (this.vehicleRegNoArray.includes(y)){
          this._uitilityService.errorAlert({error: {message:"Please enter unique registration no" }});
          this.duplicateEntry = 1;
          return;
        } 
        this.vehicleRegNoArray.push(y);
        this.vehicleTypeArray.push(z);
        let formData = {
          modal: x,
          vehicleType: z,
          regNo: y
        }
        this.vehicleData.push(formData);
      }
      // for (let i = 0; i < this.containers.length; i++) {
      //   let x = <HTMLInputElement>document.getElementsByName("vehicleName")[i];
      //   this.vehicleNameArray.push(x.value);
      // }

      // for (let i = 0; i < this.containers.length; i++) {
      //   let x = <HTMLInputElement>document.getElementsByName("registrationNo")[i];
      //   this.vehicleRegNoArray.push(x.value);
      // }
      // for (let i = 0; i < this.containers.length; i++) {
      //   console.log(this.employeeForm.controls["type" + i].value);
      //   this.vehicleTypeArray.push(this.employeeForm.controls["type" + i].value);
      // }
     
      // for (let i = 0; i < this.containers.length; i++) {



      //   if (this.employeeId) {
      //     let formData = {
      //       modal: this.vehicleNameArray[i],
      //       vehicleType: this.vehicleTypeArray[i],
      //       regNo: this.vehicleRegNoArray[i],
      //       vehicleId: this.vehicleEditData[i]
      //     }
      //     this.vehicleData.push(formData);

      //   } else {

      //     let formData = {
      //       modal: this.vehicleNameArray[i],
      //       vehicleType: this.vehicleTypeArray[i],
      //       regNo: this.vehicleRegNoArray[i]
      //     }

      //     this.vehicleData.push(formData);

      //   }

      // }
    }

  }

  getEmployeeDetail() {
    this._employeeAddService.getEmployeeDetail(this.employeeId).subscribe(
      response => {
        this.employeeDetail = response.data;

        this.vehicleEditData = response["data1"];

        this.vehicleEditData.forEach(element => {
          this.containers.push(this.containers.length);
        });

        this.patchValue(this.employeeDetail);
      },
      err => {
        this._router.navigate([EMPLOYEES_LIST]);
      }
    );
  }

  /********  Validate emp no is unique or not ********/
  validateMobileNo() {
    this.employeeForm.controls.mobileNo.valueChanges
      .pipe(
        // Chnaged time from 800 to 2000 as it was checking very frequently
        // debounceTime(800),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (res && res.length >= 3) {
          this.checkEmpNoUnique(res);
        }
      });
  }
  /***********  END   ************/

  /***********  For checking emp no is unique or not  ************/
  checkEmpNoUnique(data: string) {
    this._employeeAddService
      .checkEmployeeNoUnique({ mobileNo: data })
      .subscribe(resp => {
        if (resp && resp.statusCode == 200) {
          this.isUniqueMsg = null;
        } else if (resp && resp.statusCode == 400) {
          this.employeeForm.controls["mobileNo"].setErrors({
            incorrect: true
          });
          this.isUniqueMsg = "Mobile Number must be unique";
        }
      });
  }
  /***********  END   ************/

  patchValue(data) {
    let formValue = {
      name: data.name,
      email: data.email,
      // contactNo: data.mobileNo,
      employeeId: data.employeeId,
      gender: data.gender,
      companyLocationName: data.companyLocationName

    };
    this.employeeForm.patchValue(formValue);
    setTimeout(() => {
      this.employeeForm.controls["companyLocationName"].setValue(data.companyLocationName);
    }, 100)
  }
  createForm() {
    this.employeeForm = this._employeeAddService.createEmployeeForm();
  }
  
  getControl(control) {
    return this.employeeForm.controls[control];
  }

  // getAllShifts() {
  //   this._employeeAddService.getAllShifts().subscribe(
  //     response => {
  //       this.allShifts = response.data.shiftSlot;
  //     },
  //     err => { }
  //   );
  // }

  /***********  This method call when address select from google autocomplete   ************/
  setAddress(data) {
    if (data) {
      this.zone.run(() => {
        this.employeeForm.patchValue({
          fullAddress: data.formatted_address,
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.locality,
          state: data.admin_area_l1,
          roadName: data.sublocality_level_1
        });
      });
    }
  }
  /***********  END   ************/

  /***********  This method is call when user click outside the google input for validate the error   ************/
  checkLocation() {
    if (!this.employeeForm.controls["fullAddress"].value) {
      this.isAddress = true;
    } else {
      this.isAddress = false;
    }
  }
  /***********  END   ************/

  addEmployee() {
    console.log("check1");
    if (this.duplicateEntry === 1){
      return;
    }
    if (this.employeeId) {
      if (this.employeeForm.controls["name"].invalid || this.employeeForm.controls["email"].invalid || this.employeeForm.controls["employeeId"].invalid || this.employeeForm.controls["vehicleName0"].invalid || this.employeeForm.controls["registrationNo0"].invalid || this.employeeForm.controls["type0"].invalid || this.employeeForm.disabled) {
        if(this.employeeForm.controls["vehicleName0"].invalid || this.employeeForm.controls["registrationNo0"].invalid || this.employeeForm.controls["type0"].invalid) {
          this._uitilityService.showAlert("Add Vehicle Details!");
        } else {
          console.log("check2");
          return;
        }
      }
    } else {
      // if (this.employeeForm.controls["name"].invalid || this.employeeForm.controls["email"].invalid || this.employeeForm.controls["employeeId"].invalid || this.employeeForm.controls["vehicleName0"].invalid || this.employeeForm.controls["registrationNo0"].invalid || this.employeeForm.controls["type0"].invalid || this.employeeForm.disabled) {
      if (this.employeeForm.controls["name"].invalid || this.employeeForm.controls["email"].invalid || this.employeeForm.controls["companyLocationName"].invalid || this.employeeForm.controls["employeeId"].invalid  || this.employeeForm.disabled) {  
        return;
      }
      for (let i of this.containers){
        if (this.employeeForm.controls["vehicleName"+i].invalid || this.employeeForm.controls["type"+i].invalid || this.employeeForm.controls["registrationNo"+i].invalid || this.employeeForm.disabled) {  
          return;
        }
      }
    }

    for(let i = 0; i < this.containers.length; i++) {
      if (this.employeeForm.controls["vehicleName"+i].invalid || this.employeeForm.controls["registrationNo"+i].invalid || this.employeeForm.controls["type"+i].invalid || this.employeeForm.disabled) {
        return;
      }
    }

    // if (this.vehicleData.length == 0) {
    //   return;
    // }
    const data = { ...this.employeeForm.value };
    data.employeeId = data.employeeId.toUpperCase();
    // data.contactNo = data.mobileNo;
    data.vehicles = this.vehicleData;
    this.employeeForm.disable();
    if (this.employeeId) {
      data["empId"] = this.employeeId;
    }

    delete data.type0;
    delete data.type1;
    delete data.type2;
    delete data.type3;
    delete data.type4;
    delete data.type5;
    delete data.type6;
    delete data.type7;
    delete data.type8;
    delete data.type9;
    delete data.vehicleName0;
    delete data.vehicleName1;
    delete data.vehicleName2;
    delete data.vehicleName3;
    delete data.vehicleName4;
    delete data.vehicleName5;
    delete data.vehicleName6;
    delete data.vehicleName7;
    delete data.vehicleName8;
    delete data.vehicleName9;
    delete data.registrationNo0;
    delete data.registrationNo1;
    delete data.registrationNo2;
    delete data.registrationNo3;
    delete data.registrationNo4;
    delete data.registrationNo5;
    delete data.registrationNo6;
    delete data.registrationNo7;
    delete data.registrationNo8;
    delete data.registrationNo9;

    delete data.registrationNo;
    delete data.vehicleName;
    delete data.mobileNo;
    delete data.gender;
    delete data.contactNo;
    console.log(data);
    if (this.employeeId) {

      this._employeeAddService.editEmployee(data).subscribe(
        response => {
          this._router.navigate([EMPLOYEES_LIST]); 
        },
        err => {
          this.employeeForm.enable();
        }
      );
    } else {
      console.log(data);
      this._employeeAddService.addEmployee(data).subscribe(
        response => {
          this._router.navigate([EMPLOYEES_LIST]);
        },
        err => {
          this.employeeForm.enable();
        }
      );
    }


  }
  async changeStatus(status, cabId, isAssigned, index) {
    try {
      await this._employeeAddService.changeStatus({ status, cabId }, isAssigned);
      this.containers.length = 0;
      // this.getEmployeeDetail();
      this._router.navigate([EMPLOYEES+"/"+this.employeeId]);

      

    } catch (err) {
    }
  }

  async getLocations() {
    await this._employeeAddService.getAllLocations().subscribe(res=>{
      console.log(res);
      this.locations = res.data;
    })
  }
}

class Formvalue {

  vehicleName: string;
  type: string;
  registrationNo: string;

}