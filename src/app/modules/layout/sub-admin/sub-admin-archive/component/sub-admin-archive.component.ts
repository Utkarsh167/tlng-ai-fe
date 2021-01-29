import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from 'src/app/models/pagination';
import { SubAdminArchiveService } from '../service/sub-admin-archive.service';
import * as _ from "underscore";

@Component({
  selector: 'app-sub-admin-archive',
  templateUrl: './sub-admin-archive.component.html',
  styleUrls: ['./sub-admin-archive.component.scss']
})
export class SubAdminArchiveComponent extends Pagination implements OnInit {

  constructor( private _subAdminArchiveService: SubAdminArchiveService) { 
    super();
  }
  subAdmins = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['position', 'name', 'email', 'registeredon', 'roles', 'status'];

  ngOnInit() {
    this.getAllArchivedSubAdmins()
  }

  getAllArchivedSubAdmins(){
    let data = { ...this.validPageOptions, userType: 1, isArchived: true };
    this._subAdminArchiveService.getAllArchivedSubadmin(data)
      .subscribe(
        response => {
          this.subAdmins.data = response.data.subAdminList;
          this.total = response.data.totalRecord;
        }, err => {
        })

  }
  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getAllArchivedSubAdmins();
  }


}
