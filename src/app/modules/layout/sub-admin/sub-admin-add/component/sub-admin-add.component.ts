import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubAdminAddService } from '../service/sub-admin-add.service';
import { SUBADMIN_LIST } from 'src/app/constant/absolute-routes';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';

@Component({
  selector: 'app-sub-admin-add',
  templateUrl: './sub-admin-add.component.html',
  styleUrls: ['./sub-admin-add.component.scss']
})
export class SubAdminAddComponent implements OnInit {

  subadminForm: FormGroup;
  subAdminId: string;
  allPermission: string[] = [];
  selectedPermission: string[] = [];
  subAdminDetails: any;
  locationsData: any;
  constructor(private _subAdminAdd: SubAdminAddService,
    private _router: Router,
    private _uitilityService: UtilityService,
    private _route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.getAllPermission();
    this.getLocations();
    this.subAdminId = this._route.snapshot.params.Id; // getting notification id
  }


  getAllPermission() {
    this._subAdminAdd.getAllPermission().subscribe(response => {
      if (response && response.statusCode == 200) {
        this.allPermission = response.data.moduleName;
        console.log(this.allPermission);
        if (this.subAdminId) {
          this.getSubAdminDetail();
        }
      }
    })
  }

  getSubAdminDetail() {
    this._subAdminAdd.getSubAdminDetails(this.subAdminId).subscribe(response => {
      if (response && response.statusCode == 200) {
        this.subAdminDetails = response.data;
        this.patchValue(this.subAdminDetails);
      }
    })
  }

  /**
  set value in form
  */
  patchValue(data) {

    this.selectedPermission = data.permission;
    let formValue = {
      "name": data.name,
      "email": data.email,
      "companyLocationName": data.companyLocationName
    };
    this.subadminForm.patchValue(formValue);
    this.matchPermission();
  }


  matchPermission() {
    this.allPermission.map(x => {
      this.selectedPermission.map(permission => {
        if (permission === x['moduleKey']) {
          x['checked'] = true;
        }
      })

    })

  }

  /**
   Create Notification form
   */
  createForm() {
    this.subadminForm = this._subAdminAdd.createSubadminForm();
  }

  /***
    Get all controls
  ***/
  getControl(control) {
    return this.subadminForm.controls[control];
  }


  /*
  Method For select the permission
*/
  selectPermission(event, permission) {
    if (event) {
      this.selectedPermission.push(permission);
    }
    else {
      this.selectedPermission.map((x, index) => {
        if (x === permission) {
          this.selectedPermission.splice(index, 1);
        }
      })
    }
  }

  /**
  Method call when from is submit
  */
  submitForm() {
    if (this.subadminForm.invalid || this.subadminForm.disabled) {
      return;
    }
    if (!this.selectedPermission.length) {
      this._uitilityService.showAlert("Please select admin roles");
      return;
    }
    const data = { ...this.subadminForm.value };
    if (this.subAdminId) {
      data['userId'] = this.subAdminId;
    }
    data['permission'] = this.selectedPermission;
    this.subadminForm.disable();
    this.addSubAdmin(data);
  }

  addSubAdmin(data) {
    console.log(data);
    this._subAdminAdd.addSubadmin(data).subscribe(
      response => {
        if (response && response.statusCode == 200) {
          console.log(response);

          this._router.navigate([SUBADMIN_LIST])
        }
      },
      err => {
        this.subadminForm.enable();
      }
    )
  }

  getLocations() {
    this._subAdminAdd.getLocations().subscribe(res => {
      this.locationsData = res.data["locations"];
      console.log(this.locationsData);
    });
  }

}
