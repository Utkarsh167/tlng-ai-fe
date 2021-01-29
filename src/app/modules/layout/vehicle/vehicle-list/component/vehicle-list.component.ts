import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagination } from '../../../../../models/pagination';
import { FormGroup } from '@angular/forms';
import { VehicleListService } from '../service/vehicle-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { invalidFileError } from 'src/app/constant/messages';
import { ExcelService } from "src/app/modules/shared/services/excel.service";

// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../constant/app-constant';
import * as _ from "underscore";
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent extends Pagination implements OnInit {

  @ViewChild('upload_csv', { static: false })
  myInputVariable: ElementRef;
  displayedColumns = ['position', 'model', 'regNo', 'userName', 'userId', 'companyLocationName', 'vehicleType', 'created', 'action'];
  cabs = new MatTableDataSource<Cab.Single>([]);
  filterForm: FormGroup;
  filterObject: any;
  vendors = [];
  selectedVendorId = '';
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = '';
  menu = false;
  tempData: any;
  // Added medicalCabValue, selected - Shivakumar A
  constructor(
    private _cabListService: VehicleListService,
    private _utilityService: UtilityService,
    private excelService: ExcelService
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._cabListService.createFilterObject(this.filterForm);
    // Assign value to medicalCabValue - Shivakumar A
  }

  ngOnInit() {
    // this.searchVendor();
    this.getCabs();
  }

  createFilterForm() {
    this.filterForm = this._cabListService.getFilterForm();
  }

  getCabs() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions, vendorId: this.selectedVendorId };
    this._cabListService.getCabs(data)
      .subscribe(
        response => {
          this.cabs.data = response.data.vehicleList;
          this.total = response.data.totalCount;
        }, err => {
        }
      )
  }

  searchVendor() {
    this.filterForm.controls.vendorId.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      tap(x => {
        if (typeof x === 'string') {
          if (!x.trim()) {
            this.vendors = [];
          } else if (x.trim()) {
            this.vendors = this.vendors.filter(item => item.name.indexOf(x.trim()) >= 0)
          }
        }
      }),
      filter(x => (x && typeof x === 'string' && x.trim() && x.trim().length >= 0)),
      switchMap(data => this._cabListService.searchVendor(data))
    ).subscribe(
      response => {
      }
    )
  }

  selectVendor(event) {
    this.selectedVendorId = event.option.value._id;
    this.filterForm.get('vendorId').setValue(event.option.value.name)
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._cabListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = '';
            // this.getCabs();
          }
        },
        err => {

        }
      )
    }
    else {
      this._utilityService.showAlert(invalidFileError('only xls file allowed  '));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = '';
    this.myInputVariable.nativeElement.value = "";
  }


  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getCabs();
  }

  /*
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getCabs();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    if (event[0] == "\\"){
      return;
    }
    if (event == "\\"){
      return
    }
    this.search = event;
    this.resetPages();
    this.getCabs();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.selectedVendorId = '';
    this.resetPages();
    this.getCabs();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }

  /*
    Method For Applying The Filters
  */
  filter() {
    let a = Object.values(this.filterForm.value);
    let b = _.filter(a, function (num) {
      return num != null;
    });
    console.log(this.filterForm.value);
    console.log(b);
    this.resetPages();
    this.getCabs();
    if (this.filterForm.controls["fromDate"].value != null && this.filterForm.controls["toDate"].value == null || this.filterForm.controls["toDate"].value == "") {
      this.appliedFilterCount = b.length - 1;

    } else {
      this.appliedFilterCount = b.length;
    }
    this.isFilterApplied = true;
  }

  async changeStatus(status, cabId, isAssigned) {
    try {
      await this._cabListService.changeStatus({ status, cabId }, isAssigned);
      this.getCabs();
    } catch (err) {
    }
  }

  ngAfterViewInit() {

  }

  downloadVehicle() {
    // this.tempData = this.cabs.data;
    let vehData = { ...this.changeDateFormat(this.filterForm.value), pageNo:0, limit:0 , vendorId: this.selectedVendorId };
    this._cabListService.getCabs(vehData)
      .subscribe(
        response => {
          this.tempData = response.data.vehicleList;
          let data = this.tempData.map(element => ({
            regNo: element.regNo,
            vehicleType: element.vehicleType,
            modal: element.modal
          }));
          this.excelService.exportAsExcelFile(data, 'VehicleData');

        }, err => {
        }
      )
    

  }
}
