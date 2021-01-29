import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import {} from "googlemaps";
import { ProfileService } from "../service/profile.service";
import { Router } from "@angular/router";
import { EMPLOYEES, ADMIN_PROFILE } from "../../../../constant/absolute-routes";
import * as moment from "moment";
import { FormService } from "src/app/modules/shared/services/form.service";
import { SHIFT_DAYS } from "src/app/constant/app-constant";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit, AfterViewInit {
  editProfileForm: FormGroup;
  public searchControl: FormControl;
  profileData: any;
  slotInputGroup: FormGroup;
  checked = true;
  shiftDays = SHIFT_DAYS;
  selectedDays: string[] = [];
  @ViewChild("search", { static: true }) searchElementRef: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router,
    private _formService: FormService
  ) {}

  ngOnInit() {
    this.createForm();
    this.getProfileData();
  }

  ngAfterViewInit() {
    // this.initMap();
  }

  initMap() {
    var self = this;
    this.searchControl = new FormControl();
    var autocomplete = new google.maps.places.Autocomplete(
      self.searchElementRef.nativeElement
    );
    
    autocomplete.addListener("place_changed", function() {
      var place = autocomplete.getPlace();
      if (place) {
        self.editProfileForm.controls.address.setValue(place.formatted_address);
        self.editProfileForm.controls.address.updateValueAndValidity();
        self.editProfileForm.controls.latitude.setValue(
          place.geometry.location.lat()
        );
        self.editProfileForm.controls.longitude.setValue(
          place.geometry.location.lng()
        );
      }
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
    });
  }

  /********* For Edit the profile *************/
  getProfileData() {
    this._profile.getProfileDetails(true).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.profileData = response.data;

        this.patchValue(this.profileData);
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    );
  }

  patchValue(data) {
    let formValue = {
      name: data.userData.name,
      email: data.userData.email,
      address: data.companyData.address,
      booking_status_cutoff: data.companyData.config.booking_status_cutoff,
      geofence_cutoff: data.companyData.config.geofence_cutoff,
      duration: data.companyData.config.duration
    };
    this.editProfileForm.patchValue(formValue); // Set the data in form
    // this.getAndSetFormData(data);
  }

  // getAndSetFormData(data) {
  //   if (data.shiftSlot.length) {
  //     data.shiftSlot.map(slot => {
  //       this.shiftSlot.push(
  //         this._fb.group({
  //           startShift: [moment(slot.startShift, "HH:mm:ss")["_d"]], // for making the date format from timestamp for all slots
  //           endShift: [moment(slot.endShift, "HH:mm:ss")["_d"]],
  //           shiftName: slot.shiftName,
  //           isEdit: true,
  //           weekOff: this._fb.array([this.setWeek(slot.weekOff)])
  //         })
  //       );
  //     });
  //   } else {
  //     this.initSlot();
  //   }
  // }

  // setWeek(week) {
  //   let obj = {};
  //   week.map((element, index) => {
  //     if (element == 0) {
  //       obj[0] = element;
  //     } else if (element == 1) {
  //       obj[1] = element;
  //     } else if (element == 2) {
  //       obj[2] = element;
  //     } else if (element == 3) {
  //       obj[3] = element;
  //     } else if (element == 4) {
  //       obj[4] = element;
  //     } else if (element == 5) {
  //       obj[5] = element;
  //     } else if (element == 6) {
  //       obj[6] = element;
  //     }
  //   });
  //   return this._fb.group(obj);
  // }
  /********* END *************/

  /********* Form Creation *************/
  createForm() {
    this.editProfileForm = this._fb.group({
      name: this._formService.getControl("profileName"),
      email: this._formService.getControl("email"),
      address: this._formService.getControl("address"),
      // longitude: this._formService.getControl("longitude"),
      // latitude: this._formService.getControl("latitude"),
      // crfLimitMonth: this._formService.getControl("crfLimitMonth"),
      booking_status_cutoff: this._formService.getControl("number"),
      geofence_cutoff: this._formService.getControl("number"),
      duration: this._formService.getControl("number"),
      // shiftSlot: this._fb.array([])
    });
  }

  // initSlot() {
  //   return this._fb.group({
  //     startShift: this._formService.getControl("startShift"),
  //     endShift: this._formService.getControl("endShift"),
  //     shiftName: this._formService.getControl("alphaNumeric"),
  //     weekOff: this._fb.array([this.initWeekOff()])
  //   });
  // }

  // initWeekOff() {
  //   return this._fb.group({
  //     0: "",
  //     1: "",
  //     2: "",
  //     3: "",
  //     4: "",
  //     5: "",
  //     6: ""
  //   });
  // }

  /********* END *************/

  // selectWeekOff(event, day, data) {
  //   if (event) {
  //     data.controls["weekOff"].value.push(day);
  //   } else {
  //     data.controls["weekOff"].value.map((x, index) => {
  //       if (x === day) {
  //         data.controls["weekOff"].value.splice(index, 1);
  //       }
  //     });
  //   }
  // }

  /********* For Adding or deleting more slots *************/
  // addSlot() {
  //   this.shiftSlot.push(this.initSlot());
  // }

  // deleteSlot(index: number) {
  //   this.shiftSlot.removeAt(index);
  // }

  /********* END *************/

  // setWeekOff() {
  //   let temp = [];
  //   this.editProfileForm.value.shiftSlot.map(x => {
  //     temp = [];
  //     x.weekOff.map((week, index) => {
  //       for (let [key, value] of Object.entries(week)) {
  //         if (value != "" || value === 0) {
  //           temp.push(key);
  //         } else {
  //           delete x.weekOff[index][key];
  //         }
  //       }
  //     });
  //     x.weekOff = temp;
  //   });
  // }

  /********* Final Form Submission *************/
  submitForm() {
    if (this.editProfileForm.controls["booking_status_cutoff"].invalid || this.editProfileForm.controls["geofence_cutoff"].invalid || this.editProfileForm.disabled) {
      return;
    }
    
    // this.setWeekOff();
    delete this.editProfileForm.value.email;
    this._profile.editProfile(this.editProfileForm.value).subscribe(
      response => {
        this._profile.getProfileDetails(true).subscribe(
          data => {
            this.navigate(response);
          },
          err => {
            this.navigate(response);
          }
        );
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    );
  }
  /********* END *************/

  navigate(response) {
    this._router.navigate(["/admin/profile"]);
    if (!response.data) {
      this._router.navigate([EMPLOYEES]);
    }
  }

  getControl(control) {
    return this.editProfileForm.controls[control];
  }

  get shiftSlot() {
    return this.editProfileForm.controls["shiftSlot"] as FormArray;
  }
}
