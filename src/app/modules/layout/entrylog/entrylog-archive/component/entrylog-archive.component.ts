import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../../models/pagination';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EntryLogArchiveService } from '../service/entrylog-archive.service';

@Component({
  selector: 'app-entrylog-archive',
  templateUrl: './entrylog-archive.component.html',
  styleUrls: ['./entrylog-archive.component.scss']
})
export class EntryLogArchiveComponent extends Pagination implements OnInit {

  displayedColumns = ['position', 'image', 'name', 'driverId', 'email', 'mobileNo', 'created', 'status'];
  drivers = new MatTableDataSource<Driver.Detail>([]);

  constructor(
    private _driverListService: EntryLogArchiveService,
  ) {
    super();
  }

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    let data = { ...this.validPageOptions, userType: 2, isArchived: true };
    this._driverListService.getDrivers(data)
      .subscribe(
        response => {
          this.drivers.data = response.data.userList;
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
    this.getDrivers();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getDrivers();
  }
}
