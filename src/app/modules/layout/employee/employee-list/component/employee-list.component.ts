import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Pagination } from "../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { EmployeeListService } from "../service/employee-list.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { invalidFileError } from "src/app/constant/messages";
import * as moment from "moment-timezone";
import * as _ from "underscore";
import { ExcelService } from "src/app/modules/shared/services/excel.service";
import { SocketService } from 'src/app/modules/shared/services/socket/socket.service';
import { $ } from 'protractor';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", {static: false})
  myInputVariable: ElementRef;
  displayedColumns = [
    "position",
    "empId",
    "name",
    "email",
    "companyLocationName",
    "vehicles",
    "created",
    // commented by satyam
    // "status",
    "action"
  ];
  employees = new MatTableDataSource<Employee.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  shifts: any[] = [];
  menu = false;
  tempEmployeesData = [];
  tempData: any;

  constructor(
    private _employeeListService: EmployeeListService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef,
    private _socket: SocketService,
    private excelService: ExcelService
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._employeeListService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    // this.getShifts();
    this.getEmployees();
   
  }


  createFilterForm() {
    this.filterForm = this._employeeListService.getFilterForm();
  }

  getEmployees() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
      // userType: 1
    };
    console.log(this.filterForm.value);
    this._employeeListService.getEmployees(data).subscribe(
      response => {
        console.log(response);
        this.employees.data = response.data.userList;
        this.total = response.data.totalCount;
        this.tempEmployeesData = response.data.userList
      },
      err => {}
    );
    
    // this._employeeListService.getTestApiData('entryLog/testEventApi').subscribe(
    //   response => {
    //     console.log(response);
    //     // this.employees.data = response.data.userList;
    //     // this.total = response.data.totalCount;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    

  }

  getShifts() {
    this._employeeListService.getCompanyShift().subscribe(
      response => {
        this.shifts = response.data.shiftSlot;
      },
      err => {}
    );
  }

  setTime(date) {
    return moment
      .utc(date, "HH:mm:ss")
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format("hh:mm A");
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getEmployees();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getEmployees(); 
  }

  /*
  Method For Checking Filter Button Shoud Be Enable Or Not
 */
  disable() {
    return !this.filterForm.dirty;
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
    this.getEmployees();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getEmployees();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }
  /*
    Method For Applying The Filters
  */

  filter() {
    let a = Object.values(this.filterForm.value);
    let b = _.filter(a, function(num) {
      return num != null;
    });
    console.log(this.filterForm.value); 
    // let b = a.filter(Boolean);
    this.resetPages();
    this.getEmployees();
    // logic improvies -- satyam
    if(this.filterForm.controls["fromDate"].value != null && this.filterForm.controls["toDate"].value == null || this.filterForm.controls["toDate"].value == "") {
      this.appliedFilterCount = b.length - 1;

    } else {
      this.appliedFilterCount = b.length;
    }
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._employeeListService.changeStatus({
        status,
        userId
      });
      // if (data) {
      //   this.getEmployees();
      // }
      if (data) {
        if (this.total - (this.page*this.pageSize - this.pageSize) == 1){
          this.page = 1;
        }
        this.getEmployees();
      }
    } catch (err) {}
  }

  uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._employeeListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = "";
            this.getEmployees();
            this.myInputVariable.nativeElement.value = ""
          }
        },
        err => {}
      );
    } else {
      this._utilityService.showAlert(invalidFileError("only xls file allowed  "));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = "";
    this.myInputVariable.nativeElement.value = "";
    this._utilityService.showAlert("File Removed")

  }

  ngAfterViewInit() {}

  // function modified --satyam
  downloadEmployee() {
    
    // this.tempData =  this.employees.data;
    let empData = {
      ...this.changeDateFormat(this.filterForm.value),
      pageNo: 0,
      limit: 0
    };
    this._employeeListService.getEmployees(empData).subscribe(
      response => {
        // this.employees.data = response.data.userList;
        // this.total = response.data.totalCount;
        // this.tempEmployeesData = response.data.userList
        this.tempData = response.data.userList;
        let data = this.tempData.map(element => ({
          email: element.email,
          employeeId: element.employeeId,
          name: element.name,
          status: element.status,
          type: element.type
        }));
    
        this.excelService.exportAsExcelFile(data, 'EmployeeData');
      },
      err => {}
    );

    
  }
}
