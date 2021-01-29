import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from 'src/app/models/pagination';
import { NotificationListService } from '../service/notification-list.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends Pagination implements OnInit {

  displayedColumns = ['position', 'title', 'message', 'date', 'image'];
  noti = new MatTableDataSource<Notifications.NotificationList>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;

  constructor(
    private _notiListService: NotificationListService
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._notiListService.createFilterObject(this.filterForm);
  }

  ngOnInit() {
    this.getAllNotification();
  }

  createFilterForm() {
    this.filterForm = this._notiListService.getFilterForm();
  }

  getAllNotification() {
    let data = { ...this.changeDateFormat(this.filterForm.value), ...this.validPageOptions };
    this._notiListService.getNotifications(data)
      .subscribe(
        response => {
          this.noti.data = response.data.notificationList;
          this.total = response.data.totalCount;
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
    this.getAllNotification();
  }

  /*
      Method For Sorting
    */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAllNotification();
  }

  /*
   Method For Resetting The Filters
 */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAllNotification();
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
    this.getAllNotification();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }

  /*
  Method For Checking Filter Button Shoud Be Enable Or Not
 */
  disable() {
    return !this.filterForm.dirty;
  }

}
