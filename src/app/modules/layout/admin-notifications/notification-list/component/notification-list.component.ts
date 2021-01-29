import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from 'src/app/models/pagination';
import { FormGroup } from '@angular/forms';
import { WebNotificationService } from '../service/web-notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends Pagination implements OnInit {

  filterForm: FormGroup;
  showFilter: boolean = false;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  filterObject: any;
  notifications = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'platform', 'sentto', 'created', 'scheduledfor', 'status', 'action'];

  constructor(private _notiList: WebNotificationService) {
    super();
    this.createFilterForm();
    this.filterObject = this._notiList.createFilterObject(this.filterForm);
  }

  ngOnInit() {
    this.getAllNotifications();
  }

  createFilterForm() {
    this.filterForm = this._notiList.getFilterForm();
  }

  /*
    Method For getting all the notification 
  */

  getAllNotifications() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions };
    this._notiList.getAllNoti(data)
      .subscribe(
        response => {
          this.notifications.data = response.data.notificationList;
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
    this.getAllNotifications();
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllNotifications();
  }

  /*
    Method For Searching
  */
  setSearch(event) {
    this.search = event;
    this.resetPages();
    this.getAllNotifications();
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
    this.getAllNotifications();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }

  /*
    Method For Applying The Filters
  */
  filter() {
    let a = Object.values(this.filterForm.value);
    let b = a.filter(Boolean);
    this.resetPages();
    this.getAllNotifications();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  /*
    Method For Applying The send or delete
  */
  async changeStatus(status, userId) {
    try {
      let data = await this._notiList.changeStatus({ status, userId });
      if (data) {
        if (this.total - (this.page*this.pageSize - this.pageSize) == 1){
          this.page = 1;
        }
        this.getAllNotifications();
      }
    } catch (err) {
    }
  }

}
