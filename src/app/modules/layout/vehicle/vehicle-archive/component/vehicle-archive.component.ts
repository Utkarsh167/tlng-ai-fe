import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../../models/pagination';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleArchiveService } from '../service/vehicle-archive.service';
// Added CAR_TYPE - Shivakumar A
import { CAR_TYPE } from '../../../../../constant/app-constant';

@Component({
  selector: 'app-vehicle-archive',
  templateUrl: './vehicle-archive.component.html',
  styleUrls: ['./vehicle-archive.component.scss']
})
export class CabArchiveComponent extends Pagination implements OnInit {

  displayedColumns = ['position', 'model', 'regNo', 'userName', 'userId', 'vehicleType', 'created', 'action'];
  
  cabs = new MatTableDataSource<Cab.Single>([]);
  selectedVendorId = '';
  // Added medicalCabValue, selected - Shivakumar A

  constructor(
    private _cabListService: VehicleArchiveService,
  ) {
    super();
    // Assign value to medicalCabValue - Shivakumar A
  }

  ngOnInit() {
    this.getCabs();
  }

  getCabs() {
    let data = { ...this.validPageOptions,requestedPage: "blocked" };
    this._cabListService.getCabs(data)
      .subscribe(
        response => {
          this.cabs.data = response.data.vehicleList;
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
    this.getCabs();
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

  async changeStatus(status, cabId, isAssigned) {
    try {
      await this._cabListService.changeStatus({ status, cabId }, isAssigned);
      this.getCabs();
    } catch (err) {
    }
  }

}
