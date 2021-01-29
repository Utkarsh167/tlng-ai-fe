import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Pagination } from "../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { AuditLogsService } from "../service/audit-logs.service";

@Component({
  selector: "app-audit-logs",
  templateUrl: "./audit-logs.component.html",
  styleUrls: ["./audit-logs.component.scss"]
})
export class AuditLogsComponent extends Pagination implements OnInit {
  @ViewChild("upload_csv", {static: false})
  myInputVariable: ElementRef;
  menu = false;
  displayedColumns = [
    "position",
    "userName",
    "role",
    "date",
    "time",
    "activity",
    "action",
    "module"
  ];
  audits = new MatTableDataSource<Employee.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  shifts: any[] = [];

  constructor(
    private _auditLogService: AuditLogsService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef
  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._auditLogService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    this.getAuditLogs();
  }

  createFilterForm() {
    this.filterForm = this._auditLogService.getFilterForm();
  }

  getAuditLogs() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions
    };
    this._auditLogService.getAuditLogsData(data).subscribe(
      response => {
        this.audits.data = response.data.auditLogList;
        this.total = response.data.totalRecord;
      },
      err => {}
    );
  }

  /*
    Method For Sorting
  */
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getAuditLogs();
  }

  /*
    Method For Changing The Pagination
  */
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAuditLogs();
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
    this.search = event;
    this.resetPages();
    this.getAuditLogs();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getAuditLogs();
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
    this.getAuditLogs();
    this.appliedFilterCount = b.length;
    this.isFilterApplied = true;
  }
}
