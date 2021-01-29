import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Pagination } from 'src/app/models/pagination';
import { SubAdminListService } from '../service/sub-admin-list.service';
import * as _ from "underscore";

@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss']
})
export class SubAdminListComponent extends Pagination implements OnInit {

  filterForm: FormGroup;
  showFilter: boolean = false;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  filterObject: any;
  subAdmins = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'email', 'companyLocationName', 'registeredon', 'roles', 'status', 'action'];

  constructor(private _subAdminList: SubAdminListService) {
    super();
    this.createFilterForm();
    this.filterObject = this._subAdminList.createFilterObject(this.filterForm);
  }

  ngOnInit() {
    this.getAllSubadmins();
  }

  createFilterForm() {
    this.filterForm = this._subAdminList.getFilterForm();
  }

  /*
    Method For getting all the subadmins 
  */

  getAllSubadmins() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions };
    this._subAdminList.getAllSubadmin(data)
      .subscribe(
        response => {
          this.subAdmins.data = response.data.subAdminList;
          this.total = response.data.totalRecord;
        }, err => {
        }
      )
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllSubadmins();
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllSubadmins();
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
    this.getAllSubadmins();
  }

  /*
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
  }

  /*
      Method For Resetting The Filters
    */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllSubadmins();
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
    // logic improvised -- satyam
    if(this.filterForm.controls["fromDate"].value != null && (this.filterForm.controls["toDate"].value == null || this.filterForm.controls["toDate"].value == "")) {
      this.appliedFilterCount = b.length - 1;
    } else {
      this.appliedFilterCount = b.length;
    }
    this.resetPages();
    this.getAllSubadmins();
    this.isFilterApplied = true;
  }


  async changeStatus(status, userId) {
    try {
      let data = await this._subAdminList.changeStatus({ status, userId });
      if (data) {
        if (this.total - (this.page*this.pageSize - this.pageSize) == 1){
          this.page = 1;
        }
        this.getAllSubadmins();
      }
    } catch (err) {
    }
  }
}
