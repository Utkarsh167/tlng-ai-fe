import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { EntryLogListService } from "../service/entrylog-list.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SOCKET_EVENT } from "src/app/constant/app-constant";
import  { CAR_TYPE } from 'src/app/constant/app-constant';
import { Pagination } from "../../../../../models/pagination";
import { Router, ActivatedRoute } from '@angular/router';
import { DRIVER } from '../../../../../constant/absolute-routes';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent extends Pagination implements OnInit {

  modalForm: FormGroup;
  datas: any;
  socketEvents = SOCKET_EVENT;
  minDate;
  employeeSearchData: any;
  carType = CAR_TYPE;
  selectedTab: any;
  userId: any;
  empName:any;
  constructor(private service: EntryLogListService,
    private _router: Router,
    private  _utilityService: UtilityService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
       super();
      this.datas = data;
     }

  ngOnInit() {
    this.minDate = new Date();
    this.createForm();
    this.display();
  }

  createForm() {
    this.modalForm = this.service.createModalForm();
  }

  getControl(control) {
    return this.modalForm.controls[control];
  }

  display() {
    let regNo = document.getElementById("regNo");
    let form = document.getElementById("form");
    let done = document.getElementById("done");
    let cancel = document.getElementById("cancel");
    if(this.datas.data.event  == SOCKET_EVENT[0].value) {
      done.style.display = "block";
    } else if(this.datas.data.event  == SOCKET_EVENT[1].value) {
      cancel.style.display = "block";
    } else if(this.datas.data.event  == SOCKET_EVENT[2].value) {
      done.style.display = "block";
    } else if(this.datas.data.event  == SOCKET_EVENT[3].value) {
      cancel.style.display = "block";
    } else if(this.datas.data.event  == SOCKET_EVENT[4].value) {
      cancel.style.display = "block";
    } else if(this.datas.data.event  == SOCKET_EVENT[5].value) {
      form.style.display = "block";
    }
    
  }
  radioChange(event) {
    let guest = document.getElementById("guest");
    let employee = document.getElementById("employee");
    this.selectedTab = event.value;
    if (event.value == 'guest') {
      guest.style.display = "block";
      employee.style.display = "none";
    } else {
      guest.style.display = "none";
      employee.style.display = "block";
    }
  }

  addManualEntry() {
    this._router.navigate([DRIVER]);
    this.modalForm.value["companyLocationName"] = localStorage.getItem("companyLocationName");
    console.log(this.selectedTab);
    this.modalForm.value.regNo = this.datas.data.data.regNo;
    if(this.selectedTab == "employee") {
      this.modalForm.value["userId"] = this.userId;
      // if(this.modalForm.controls["employeeId"].invalid || this.modalForm.controls["vehicleType"].invalid || this.modalForm.controls["modal"].invalid ) {
        if(this.modalForm.controls["employeeId"].invalid  ) {
      this._utilityService.showAlert("Employee id is mandatory");
        return;
     }
     if(this.modalForm.controls["vehicleType"].invalid) {
      delete this.modalForm.value["vehicleType"];
    }
     
    } else {

      if(this.modalForm.controls["mobile"].value != "" && this.modalForm.controls["mobile"].invalid) {
       this._utilityService.showAlert("Only Numbers are allowed");
        return;
      } else if(this.modalForm.controls["name"].value != "" && this.modalForm.controls["name"].invalid) {
        this._utilityService.showAlert("Name must contain only alphabets");
        return;
      }

      if(this.modalForm.controls["vehicleType"].invalid) {
        delete this.modalForm.value["vehicleType"];
      }
      this.modalForm.value.validity = this.modalForm.value.guestValidity;

    }
    console.log(this.data);
    console.log(this.modalForm.value);
    let requestData = {...this.data.data.data, ...this.modalForm.value};
    console.log(requestData);
    this.service.addManualEntry(requestData).subscribe(res => {
      this._utilityService.showAlert(res.message);
         this.dialogRef.close();
    }, err =>{
      this._utilityService.showAlert(err.error.error);
      
    });
  }

  searchEmp(event) {
    this.search = event;
    this.resetPages();;
    this.getEmployees()
  }

  getData(event) {
   console.log(event);
   console.log(this.userId)
  }

  getEmployees() {

    let data = {
      ...this.changeDateFormat(this.modalForm.value),
      ...this.validPageOptions,
      limit: 10
    };

     console.log(data)
    this.service.getEmployees(data).subscribe(
      response => {
        this.employeeSearchData = response.data.userList;
          console.log(this.employeeSearchData);
          if(this.employeeSearchData.length>0){
            this.userId = this.employeeSearchData[0]._id;
            this.empName = this.employeeSearchData[0].name;
          }else{
            this.userId = null;
            this.empName = '';
          }
          
      },
      err => {}
    );
  }
}
