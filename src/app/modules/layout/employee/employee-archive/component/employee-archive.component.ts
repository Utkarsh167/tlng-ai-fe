import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../models/pagination';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeArchiveService } from '../service/employee-archive.service';

@Component({
  selector: 'app-employee-archive',
  templateUrl: './employee-archive.component.html',
  styleUrls: ['./employee-archive.component.scss']
})
export class EmployeeArchiveComponent extends Pagination implements OnInit {

  @ViewChild('upload_csv', {static: false})
  myInputVariable: ElementRef;
  // displayedColumns = ['position', 'name', 'empId', 'email', 'contactNo', 'created', 'shiftName', 'startTime', 'endTime', 'pickupLocation', 'dropLocation'];
  displayedColumns = [
    "position",
    "empId",
    "name",
    "email",
    "created",
    "action"
  ];
  employees = new MatTableDataSource<Employee.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = '';
  shifts: any[] = [];
  menu = false;

  constructor(
    private _archiveService: EmployeeArchiveService,
  ) {
    super();
  }

  ngOnInit() {
    this.getArchivedEmployees();
  }


  getArchivedEmployees() {
    let data = { ...this.validPageOptions, userType: 1, requestedPage: "blocked" };
    this._archiveService.getArchivedEmployees(data)
      .subscribe(
        response => {
          this.employees.data = response.data.userList;
          this.total = response.data.totalCount;
        }, err => {

        }
      )
  }



  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getArchivedEmployees();

  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getArchivedEmployees();
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._archiveService.changeStatus({
        status,
        userId
      });
      if (data) {
        this.getArchivedEmployees();
      }
    } catch (err) {}
  }

}
