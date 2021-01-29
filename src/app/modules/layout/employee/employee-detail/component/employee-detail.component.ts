import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from '../service/employee-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPLOYEES } from '../../../../../constant/absolute-routes';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Pagination } from "../../../../../models/pagination";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent extends Pagination implements OnInit {

  employee: any;
  employeeId: string;
  // User Counts -- satyam
  cancelledTripCount: any;
  rescheduleTripCount: any;
  noShowCount: any;

  displayedColumns = [
    "position",
    "regNo",
    "model",
    "type",
    "created",
    "status",
    "action",
  ];
  vehicles = new MatTableDataSource<Employee.Detail>([]);

  constructor(
    private _employeeDetailService: EmployeeDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    super();
  }

  ngOnInit() {
    this.employeeId = this._route.snapshot.params.employeeId;
    this.getEmployeeDetail();
  }

  getEmployeeDetail() {
    this._employeeDetailService.getEmployeeDetail(this.employeeId).subscribe(
      response => {
        if (!response.data) {
          this._router.navigate([EMPLOYEES]);
        }
        this.employee = response.data;
        this.vehicles.data = response["data1"];
        this.total = this.vehicles.data.length;

        // User Counts -- satyam
        this.cancelledTripCount = response["data3"];
        this.rescheduleTripCount = response["data2"];
        this.noShowCount = response["data4"]
        
      },
      err => {
        this._router.navigate([EMPLOYEES]);
      }
    )
  }
  // status - detail page -- satyam
  async changeStatus(status, userId) {
    try {
      let data = await this._employeeDetailService.changeStatus({
        status,
        userId
      });
      if (data) {
        this._router.navigate([EMPLOYEES]);
        
      }
    } catch (err) {}
  }

  async changeVehicleStatus(status, cabId, isAssigned) {
    try {
      await this._employeeDetailService.changeVehicleStatus({ status, cabId }, isAssigned);
      this.getEmployeeDetail();

    } catch (err) {
    }
  }

   /*
    Method For Changing The Pagination
  */
 changePage(event: MatPaginator) {
  this.pageOptionsOnChange = event;
  if (this.total == 0) {
    return;
  }
  this.getEmployeeDetail();
}
}
