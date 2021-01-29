import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  HostListener,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Pagination } from "../../../../../models/pagination";
import { FormGroup } from "@angular/forms";
import { EntryLogListService } from "../service/entrylog-list.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UtilityService } from "src/app/modules/shared/services/utility.service";
import { invalidFileError } from "src/app/constant/messages";
import { DialogComponent } from '../dialog/dialog.component';
import * as _ from "underscore";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketService } from 'src/app/modules/shared/services/socket/socket.service';
import { SOCKET_EVENT } from 'src/app/constant/app-constant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-entrylog-list",
  templateUrl: "./entrylog-list.component.html",
  styleUrls: ["./entrylog-list.component.scss"]
})
export class EntryLogListComponent extends Pagination implements OnInit,OnDestroy {
  @ViewChild("upload_csv", { static: false })
  myInputVariable: ElementRef;
  displayedColumns = ['position', 'numPlate', 'userName', 'userType', 'inTime', 'outTime', 'type', 'modal', 'entryType', 'companyLocationName', 'status', 'event', 'ocr', 'action'];

  entryLogs = new MatTableDataSource<Driver.Detail>([]);
  filterForm: FormGroup;
  filterObject: any;
  appliedFilterCount: number = 0;
  isFilterApplied: boolean = false;
  csvFileName: string = "";
  menu = false;
  permission: any;
  isAudit: boolean;
  dialogRef;
  constructor(
    private _driverListService: EntryLogListService,
    private _utilityService: UtilityService,
    private _elementRef: ElementRef,
    private dialog: MatDialog,
    private _socket: SocketService,
    private _router: Router,

  ) {
    super();
    this.createFilterForm();
    this.filterObject = this._driverListService.createFilterObject(
      this.filterForm
    );
  }

  ngOnInit() {
    this.permission = this._driverListService.getPermission();
    if(this.permission == '["guard"]') {
      this.isAudit = true
    } else {
      this.isAudit = false
    }
    // console.log(this.isAudit);
    this.getDrivers();
    this._driverListService.getLocations();
    this.initSocket();
  
  }
  

  initSocket() {
    this._socket.initialiseSocket(true);
    this.getSocketTestData();
  }

  getSocketTestData() {
    this._socket.getTestData().subscribe(res => {
      // this.dialog.closeAll();
      if(this.dialogRef){
        // this.dialogRef.closeAll();
      this.dialog.closeAll();
      }
      console.log(res);
      setTimeout(() => {
        this.openMapDialog(res);
        this._socket.initialiseSocket(false);
      }, 500); //milliseconds
    });
  }


  unSubscribeSocket(){
    this._socket.onClose();
  }

  createFilterForm() {
    this.filterForm = this._driverListService.getFilterForm();
  }

  openMapDialog(data): void {
    let height = "500px";
    if (data.event == SOCKET_EVENT[5].value) {
      height = "600px";
    }
    // const dialogRef = this.dialog.open(DialogComponent, {
      this.dialogRef = this.dialog.open(DialogComponent, {
      width: "600px",
      height: height,
      data: { data: data }
    });

    if (data.hidden) {
      setTimeout(() => {
        this.dialogRef.close();
      }, 5000);
    }

    this.dialogRef.afterClosed().subscribe(result => {
    //  this.ngOnInit();
    this.permission = this._driverListService.getPermission();
    if(this.permission == '["guard"]') {
      this.isAudit = true
    } else {
      this.isAudit = false
    }
    // console.log(this.isAudit);
    this.getDrivers();
    this._driverListService.getLocations();
    });

  }


  getDrivers() {
    let data = {
      ...this.changeDateFormat(this.filterForm.value),
      ...this.validPageOptions,
    };
    if(this.isAudit) {
      data.requestedPage = "manual";
    }
    // console.log(data)
    this._driverListService.getDrivers(data).subscribe(
      response => {
        // console.log(response);
        // console.log(data);
        this.entryLogs.data = response.data.entryLogList;
        // console.log(this.entryLogs);
        this.total = response.data.totalCount;
      },
      err => { }
    );
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
    Method For Checking Filter Button Shoud Be Enable Or Not
  */
  disable() {
    return !this.filterForm.dirty;
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
    this.getDrivers();
  }

  /*
    Method For Resetting The Filters
  */
  resetFilter() {
    this.filterForm.reset();
    this.resetPages();
    this.getDrivers();
    this.appliedFilterCount = 0;
    this.isFilterApplied = false;
  }

  /*
    Method For Applying The Filters
  */
  filter() {
    let a = Object.values(this.filterForm.value);
    let b = _.filter(a, function (num) {
      return num != null;
    });
    // improvised logic
    if (this.filterForm.controls["fromDate"].value != null && (this.filterForm.controls["toDate"].value == null || this.filterForm.controls["toDate"].value == "")) {
      this.appliedFilterCount = b.length - 1;
    } else {
      this.appliedFilterCount = b.length;
    }
    this.resetPages();
    this.getDrivers();
    this.isFilterApplied = true;
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._driverListService.changeStatus({ status, userId });
      if (data) {
        this.getDrivers();
      }
    } catch (err) { }
  }

  async uploadCSV(e) {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel") {
      this.csvFileName = file.name;
      this._driverListService.uploadFile(file).subscribe(
        response => {
          if (response && response.statusCode == 200) {
            this.csvFileName = "";
            this.getDrivers();
          }
        },
        err => { }
      );
    } else {
      this._utilityService.showAlert(invalidFileError("'only xls file allowed  "));
    }
  }

  //  remove selected csv
  async removeCSV() {
    this.csvFileName = "";
    this.myInputVariable.nativeElement.value = "";
  }

  ngAfterViewInit() {
   }

   openImageModal(imagelink,element){

    console.log(imagelink);
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    // var img = document.getElementById("myImg");
    var modalImg:any; 
    modalImg= document.getElementById("img01");
    var captionText = document.getElementById("caption");
    // img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = imagelink;
      captionText.innerHTML = element.vehicleId?element.vehicleDetails.regNo+'('+element.name+')':element.vehicleInfo.regNo+'('+element.vehicleInfo.name+')';
    // }
    
    // Get the <span> element that closes the modal
    var span;
    span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
    }
   }

  ngOnDestroy(){
    this.unSubscribeSocket();
  }
}
