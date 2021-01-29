import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Pagination } from '../../../../../models/pagination';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ReportsService } from '../service/reports.service';
import { DURATION, FLOORS, STATUS, VIEW, NOTIFICATION_AUDIENCE, SENDNOW } from '../../../../../constant/app-constant'
import { duration } from 'moment';
import { MapviewComponent } from '../mapview/mapview.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { even } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { POPUP_MESSAGES, PARKED_LONG } from 'src/app/constant/messages'
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { element } from 'protractor';
import { DataExchange } from 'aws-sdk/clients/all';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ExcelService } from "src/app/modules/shared/services/excel.service";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  providers: [],
})
export class ReportsListComponent extends Pagination implements OnInit {


  //for Date range
  selected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  /*  maxDate: moment.Moment;
   minDate: moment.Moment; */
  maxDate: moment.Moment;
  minDate: moment.Moment;
  loadDiv = false;

  invalidDates: moment.Moment[] = [];
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  datas = new MatTableDataSource<Snapshot.Detail>([]);
  // @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  displayedColumns = ['position', 'name', 'phoneNo', 'camera', 'zone', 'slotNo', 'vehicleId', 'duration', 'enteredAt', 'exitedAt', 'image', 'status', 'action'];
  IMAGE_SRC: any;
  selectForm: FormGroup;
  scopeMapData: any;
  snapShotData: any;
  tempScopeMapData: any;
  tempSnapShotData: any;
  durationColors: any;
  VacantData: number;
  OccupiedData: number;
  MedianDuration: any;
  toggleNav: boolean;
  imageSize: any={};
  currentTimestamp: any;
  previousTimestamp: any;
  SliderTimestamp: any;
  duration = DURATION;
  status = STATUS;
  view = VIEW;
  locationsData: any;
  floorsData: any;
  zonesData: any;
  user: any;
  user_password: any;
  buildingUrl: any;
  params: any;
  cameras: any;
  selectedTime: any;
  sliderDisabled: boolean;
  sliderValue: any;
  cameraImage: any;
  cameraImageSize: any;
  tempImageSize: any;
  tempImageSrc: any;
  cameraScopeData: any;
  withImage: boolean;
  selectedView: any;
  selectedBuilding = "0";
  selectedFloor: any;
  selectedZone = "1000";
  disableZone: boolean;
  selectedMap: "0";
  selectedCamera = "0";
  mainScopeData: any;
  status_selected = "all";
  duration_selected = "0";
  floorName: any;
  overallData = { occupied: 0, available: 0 };
  longHours: any;
  previous7Days: any;
  occupancyChart: Chart;
  inTurnoverChart;
  outTurnoverChart;
  medianDurationChart;

  occupancyVariationData = [];

  inTurnoverData = [];
  outTurnoverData = [];


  inEntryChart;
  outEntryChart;
  inEntryData = [];
  outEntryData = [];

  medianDurationData = [];


  dataWeekly = [];

  maxMedian;
  minMedian;

  avg_occupancy=0;
  global_all: any = {};
  // total_inflow;
  // peak_at;
  // lull_at;
  // median_duration;
  // total_duration;

  maxOccupancy = {};
  minOccupancy = {};

  minTurnover = {};
  maxTurnover = {};

  minMedianDuration: any = {};
  maxMedianDuration: any = {};

  minMedianDurationTime = {};
  maxMedianDurationTime = {};

  medianDuration;
  totalDuration;

  averageTurnover;

  startDate;
  endDate;
  aggregateData = [];

  arraySpotWiseResponse = [];

  aggregateResponse: any = {};

  currentTab = 0;
  valueHund = 100;

  // anpr entry data
  autoEntryCountPer;
  manEntryCountPer;
  autoEntryCount;
  manEntryCount;
  totEntryCount;
  empEntryCount;
  guestEntryCount;
  inCount;
  outCount;

  inoutgraphData;
  // onLoad: boolean;
  constructor(private _reportsService: ReportsService, private dialog: MatDialog,
    private _utilityService: UtilityService,
    private excelService: ExcelService

  ) {
    super();
    // this.createSelectForm();
    this.maxDate = moment();
    this.minDate = moment().subtract(1, 'years');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = false;
    this.selected = { startDate: moment().subtract(1, 'days'), endDate: moment() };
  }



  ngOnInit() {
    // this.onLoad = true;
    this.sliderDisabled = true;
    this.toggleNav = true; //change it to false to hide table on load
    this.withImage = false;
    this.getCurrentTimeStamp();
    this.getPrevious24Hours();
    this.getLocations();
    this.getPrevious7days();
    this.getLongDuration();

    // console.log(new Date(this.selected.startDate).getTime());

    // this.selectedZone = "All";
    // this.downloadVideo();
  }

  /*
      Method For Sorting
  */

  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    // this.getSnapshotData();
  }

  /*
    Method For Changing The Pagination
  */

  createSelectForm() {
    this.selectForm = this._reportsService.createSelectForm();
  }

  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    // this.getSnapshotData(event);
  }

  async getScopeData(camera?: any) {
    // let firstCol = document.getElementById("firstCol");
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.add('image_overflow');

    if (this.mainScopeData != undefined) {
      this.scopeMapData = this.objectKeys(this.mainScopeData.data["visual_plans"][this.params.floorValue]["spots"]);
      this.tempScopeMapData = this.scopeMapData;
      this.imageSize = this.mainScopeData.data["visual_plans"][this.params.floorValue]["image_size"];
      this.tempImageSize = this.mainScopeData.data["visual_plans"][this.params.floorValue]["image_size"];
      this.cameras = this.mainScopeData.data["visual_plans"][this.params.floorValue]["camera_ids"];
      this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][this.cameras[0]]["spots"]);
      this.cameraImageSize = this.mainScopeData.data["cameras"][this.cameras[0]]["image_size"];
      this.floorName = this.params.floorValue;
      if (camera) {
        this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][camera]["spots"]);
        this.cameraImageSize = this.mainScopeData.data["cameras"][camera]["image_size"];

      }
      // if (this.params.floor == FLOORS[0].viewValue) {
      //   this.scopeMapData = this.objectKeys(this.mainScopeData.data["visual_plans"][FLOORS[0].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = this.mainScopeData.data["visual_plans"][FLOORS[0].value]["image_size"];
      //   this.tempImageSize = this.mainScopeData.data["visual_plans"][FLOORS[0].value]["image_size"];
      //   this.cameras = this.mainScopeData.data["visual_plans"][FLOORS[0].value]["camera_ids"];
      //   this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][this.cameras[0]]["spots"]);
      //   this.cameraImageSize = this.mainScopeData.data["cameras"][this.cameras[0]]["image_size"];
      //   this.floorName = FLOORS[0].value;
      //   if (camera) {
      //     this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][camera]["spots"]);
      //     this.cameraImageSize = this.mainScopeData.data["cameras"][camera]["image_size"];

      //   }

      // } else if (this.params.floor == FLOORS[1].viewValue) {
      //   this.scopeMapData = this.objectKeys(this.mainScopeData.data["visual_plans"][FLOORS[1].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = this.mainScopeData.data["visual_plans"][FLOORS[1].value]["image_size"];
      //   this.tempImageSize = this.mainScopeData.data["visual_plans"][FLOORS[1].value]["image_size"];
      //   this.cameras = this.mainScopeData.data["visual_plans"][FLOORS[1].value]["camera_ids"];
      //   this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][this.cameras[0]]["spots"]);
      //   this.cameraImageSize = this.mainScopeData.data["cameras"][this.cameras[0]]["image_size"];
      //   this.floorName = FLOORS[1].value;

      //   if (camera) {
      //     this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][camera]["spots"]);
      //     this.cameraImageSize = this.mainScopeData.data["cameras"][camera]["image_size"];

      //   }

      // } else if (this.params.floor == FLOORS[2].viewValue) {
      //   this.scopeMapData = this.objectKeys(this.mainScopeData.data["visual_plans"][FLOORS[2].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = this.mainScopeData.data["visual_plans"][FLOORS[2].value]["image_size"];
      //   this.tempImageSize = this.mainScopeData.data["visual_plans"][FLOORS[2].value]["image_size"];
      //   this.cameras = this.mainScopeData.data["visual_plans"][FLOORS[2].value]["camera_ids"];
      //   this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][this.cameras[0]]["spots"]);
      //   this.cameraImageSize = this.mainScopeData.data["cameras"][this.cameras[0]]["image_size"];
      //   if (camera) {
      //     this.cameraScopeData = this.objectKeys(this.mainScopeData.data["cameras"][camera]["spots"]);
      //     this.cameraImageSize = this.mainScopeData.data["cameras"][camera]["image_size"];
      //   }
      //   this.floorName = FLOORS[2].value;
      // }
      //console.log(this.cameraScopeData)
      this.durationColors = this.mainScopeData.data["duration_colors"];
      // firstCol.style.width = this.imageSize.width;
      // firstCol.style.height = this.imageSize.height;
      if (this.withImage && !camera) {
        //console.log("called", this.selectedView);

        if (this.selectedView == 0) {
          //console.log(1);

          this.withImage = false;
          this.params.withImage = false;
          this.params.cameras = this.cameras;
          this.scopeMapData = this.scopeMapData;
          this.snapShotData = undefined;
          this.getAggregateData();
          // this.getSnapshotData(undefined, undefined, undefined);
        } else if (this.selectedView == 1) {
          //console.log(2);

          this.withImage = true;
          this.params.withImage = false;
          this.params.cameras = [this.cameras[0]];
          this.scopeMapData = this.cameraScopeData;
          this.snapShotData = undefined;
          this.getAggregateData();

          // this.getSnapshotData(undefined, undefined, this.cameras[0]);
          // console.log(this.scopeMapData);
          // console.log(this.cameraImageSize);
          // console.log(this.IMAGE_SRC);
        } else {
          // console.log(3);

          this.params.withImage = false;
          this.params.cameras = this.cameras;
          this.scopeMapData = this.scopeMapData;
          this.snapShotData = undefined;
          this.getAggregateData();
          // this.getSnapshotData(undefined, undefined, undefined);
        }
        return;
      }

      if (camera) {
        let formattedScopeData = [];
        let formattedData = [];

        this.params.withImage = true;
        this.withImage = false;
        this.params.cameras = [camera];
        formattedScopeData = this.scopeMapData.filter(element => element.camera_id == camera);
        formattedScopeData.map((item, i) => {
          formattedData.push(item);
        });
        this.scopeMapData = formattedData;
        this.tempScopeMapData = formattedData;
        this.snapShotData = undefined;
        this.getAggregateData();
        // this.getSnapshotData(undefined, undefined, undefined);
      } else {
        this.withImage = false;
        if (!camera) {
          this.params.cameras = this.cameras;
          this.params.withImage = false;
        } else {
          this.params.cameras = [this.cameras[0]];
          this.params.withImage = true;
        }

        this.scopeMapData = this.tempScopeMapData;
        this.snapShotData = undefined;
        this.getAggregateData();
        // this.getSnapshotData(undefined, undefined, undefined);
      }

      // console.log(this.selectedView);
      if (this.selectedView == 1) {
        // console.log(11111);
      }
    } else {
      await this._reportsService.getScopeData(this.params).subscribe(res => {
        this.scopeMapData = [];
        this.imageSize = [];
        this.cameras = [];
        this.mainScopeData = res;
        this.scopeMapData = this.objectKeys(res.data["visual_plans"][this.params.floorValue]["spots"]);
        this.tempScopeMapData = this.scopeMapData;
        this.imageSize = res.data["visual_plans"][this.params.floorValue]["image_size"];
        this.tempImageSize = res.data["visual_plans"][this.params.floorValue]["image_size"];
        this.cameras = res.data["visual_plans"][this.params.floorValue]["camera_ids"];
        this.cameraScopeData = this.objectKeys(res.data["cameras"][this.cameras[0]]["spots"]);
        this.cameraImageSize = res.data["cameras"][this.cameras[0]]["image_size"];
        this.floorName = this.params.floorValue;

        if (camera) {
          this.cameraScopeData = this.objectKeys(res.data["cameras"][camera]["spots"]);
          this.cameraImageSize = res.data["cameras"][camera]["image_size"];

        }

        // if (this.params.floor == FLOORS[0].viewValue) {
        //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[0].value]["spots"]);
        //   this.tempScopeMapData = this.scopeMapData;
        //   this.imageSize = res.data["visual_plans"][FLOORS[0].value]["image_size"];
        //   this.tempImageSize = res.data["visual_plans"][FLOORS[0].value]["image_size"];
        //   this.cameras = res.data["visual_plans"][FLOORS[0].value]["camera_ids"];
        //   this.cameraScopeData = this.objectKeys(res.data["cameras"][this.cameras[0]]["spots"]);
        //   this.cameraImageSize = res.data["cameras"][this.cameras[0]]["image_size"];
        //   this.floorName = FLOORS[0].value;

        //   if (camera) {
        //     this.cameraScopeData = this.objectKeys(res.data["cameras"][camera]["spots"]);
        //     this.cameraImageSize = res.data["cameras"][camera]["image_size"];

        //   }

        // } else if (this.params.floor == FLOORS[1].viewValue) {
        //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[1].value]["spots"]);
        //   this.tempScopeMapData = this.scopeMapData;
        //   this.imageSize = res.data["visual_plans"][FLOORS[1].value]["image_size"];
        //   this.tempImageSize = res.data["visual_plans"][FLOORS[1].value]["image_size"];
        //   this.cameras = res.data["visual_plans"][FLOORS[1].value]["camera_ids"];
        //   this.cameraScopeData = this.objectKeys(res.data["cameras"][this.cameras[0]]["spots"]);
        //   this.cameraImageSize = res.data["cameras"][this.cameras[0]]["image_size"];
        //   this.floorName = FLOORS[1].value;

        //   if (camera) {
        //     this.cameraScopeData = this.objectKeys(res.data["cameras"][camera]["spots"]);
        //     this.cameraImageSize = res.data["cameras"][camera]["image_size"];

        //   }

        // } else if (this.params.floor == FLOORS[2].viewValue) {
        //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[2].value]["spots"]);
        //   this.tempScopeMapData = this.scopeMapData;
        //   this.imageSize = res.data["visual_plans"][FLOORS[2].value]["image_size"];
        //   this.tempImageSize = res.data["visual_plans"][FLOORS[2].value]["image_size"];
        //   this.cameras = res.data["visual_plans"][FLOORS[2].value]["camera_ids"];
        //   this.cameraScopeData = this.objectKeys(res.data["cameras"][this.cameras[0]]["spots"]);
        //   this.cameraImageSize = res.data["cameras"][this.cameras[0]]["image_size"];
        //   this.floorName = FLOORS[2].value;

        //   if (camera) {
        //     this.cameraScopeData = this.objectKeys(res.data["cameras"][camera]["spots"]);
        //     this.cameraImageSize = res.data["cameras"][camera]["image_size"];
        //   }
        // }
        this.durationColors = res.data["duration_colors"];
        // firstCol.style.width = this.imageSize.width;
        // firstCol.style.height = this.imageSize.height;
        if (this.withImage && !camera) {

          if (this.selectedView == VIEW[0].value) {
            this.withImage = false;
            this.params.withImage = false;
            this.params.cameras = this.cameras;
            this.scopeMapData = this.scopeMapData;
            this.snapShotData = undefined;
            this.getAggregateData();

            // this.getSnapshotData(undefined, undefined, undefined);
          } else if (this.selectedView == VIEW[1].value) {
            this.withImage = true;
            this.params.withImage = false;
            this.params.cameras = this.cameras;
            this.scopeMapData = this.cameraScopeData;
            this.snapShotData = undefined;
            this.getAggregateData();
            // this.getSnapshotData(undefined, undefined, undefined);
          } else {
            this.params.withImage = false;
            this.params.cameras = this.cameras;
            this.scopeMapData = this.scopeMapData;
            this.snapShotData = undefined;
            this.getAggregateData();
            // this.getSnapshotData(undefined, undefined, undefined);
          }
          return;
        }

        if (camera) {
          let formattedScopeData = [];
          let formattedData = [];

          this.params.withImage = true;
          this.withImage = false;
          this.params.cameras = [camera];
          formattedScopeData = this.scopeMapData.filter(element => element.camera_id == camera);
          formattedScopeData.map((item, i) => {
            formattedData.push(item);
          });
          this.scopeMapData = formattedData;
          this.tempScopeMapData = formattedData;
          this.snapShotData = undefined;
          this.getAggregateData();
          // this.getSnapshotData(undefined, undefined, undefined);
        } else {
          this.withImage = false;
          if (!camera) {
            this.params.cameras = this.cameras;
            this.params.withImage = false;
          } else {
            this.params.cameras = [this.cameras[0]];
            this.params.withImage = true;
          }

          this.scopeMapData = this.tempScopeMapData;
          this.snapShotData = undefined;
          this.getAggregateData();
          // this.getSnapshotData(undefined, undefined, undefined);
        }

        console.log(this.scopeMapData);

      });
    }


  }

  // async getSnapshotData(paginator?: any, timeRange?: any, camera?: any, isSlider?: any) {
  //   // this.paginator.pageIndex = 0;
  //   // console.log(paginator);
  //   let data = [];
  //   if (this.snapShotData == undefined) {
  //     console.log("here");
  //     this.tempScopeMapData = this.scopeMapData;
  //     if (this.selectedView == 1) {
  //       this.params.withImage = true;
  //     }
  //     this.params.timestamp = this.currentTimestamp;
  //     // console.log(this.params)
  //     await this._reportsService.getSnapshotData(this.params).subscribe(res => {
  //       // console.log(res);
  //       this.snapShotData = res.data.spot_states;
  //       this.MedianDuration = res.data.median_duration;
  //       this.tempSnapShotData = this.snapShotData;
  //       this.VacantData = res.data.spot_states.length - res.data["occupiers"];
  //       this.OccupiedData = res.data["occupiers"];
  //       this.overallData.occupied = this.OccupiedData;
  //       this.overallData.available = this.VacantData;
  //       this.cameraImage = "data:image/png;base64," + res.data.image;
  //       // console.log(this.cameraImage);
  //       if (camera) {
  //         this.IMAGE_SRC = this.cameraImage;
  //       }
  //       // Pagination

  //       if (paginator != undefined) {
  //         let StartPageIndex = paginator.pageIndex * paginator.pageSize;
  //         let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
  //         this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
  //           data.push(item);
  //         });
  //       } else {
  //         this.snapShotData.slice([0], [10]).map((item, i) => {
  //           data.push(item);
  //         });
  //         this.page = 1;
  //       }
  //       this.sliderDisabled = false;


  //       this.total = this.snapShotData.length;
  //       this.datas.data = data;

  //       // get colors based on duration
  //       this.snapShotData.forEach(elementSnapShotData => {
  //         this.durationColors.forEach((elementDurationColors) => {
  //           if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
  //             elementSnapShotData.color = elementDurationColors.color;
  //           } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
  //             elementSnapShotData.color = elementDurationColors.color;
  //           }
  //         });
  //       });

  //       if (camera != undefined) {

  //         let formattedSnapshotData = [];
  //         let formattedData = [];
  //         formattedSnapshotData = this.snapShotData.filter(element => element.camera_id == camera);
  //         formattedSnapshotData.slice(0, 10).map((item, i) => {
  //           formattedData.push(item);
  //         });
  //         this.page = 1;
  //         this.total = formattedSnapshotData.length;
  //         this.datas.data = formattedData;
  //       }
  //       this.scopeMapData = [];
  //       // console.log(this.tempScopeMapData);
  //       if (this.selectedView == 1) {
  //         this.tempScopeMapData = this.objectKeys(this.mainScopeData.data.cameras[this.params.cameras[0]].spots);
  //         this.snapShotData.forEach(element => {
  //           this.tempScopeMapData.forEach(inner_element => {
  //             if (inner_element.external_id == element.spot_id) {
  //               this.scopeMapData.push(inner_element);
  //             }
  //           });
  //         });
  //         this.imageSize = this.cameraImageSize;
  //         this.withImage = true;
  //       } else {
  //         this.snapShotData.forEach(element => {
  //           this.tempScopeMapData.forEach(inner_element => {
  //             if (inner_element.spot_id == element.spot_id && inner_element.camera_id == element.camera_id) {
  //               this.scopeMapData.push(inner_element);
  //             }
  //           });
  //         });
  //         this.imageSize = this.imageSize;
  //         this.withImage = false;
  //       }


  //       // console.log(this.scopeMapData)
  //       // console.log(this.snapShotData)


  //     });


  //   } else {

  //     if (timeRange != undefined) {
  //       this.params.timestamp = timeRange;
  //       console.log("thenhere");
  //       console.log(this.cameras);
  //       if (isSlider) {
  //         this.params.cameras = this.cameras;
  //         this.params.withImage = false;
  //       }
  //       console.log(this.params);
  //       await this._reportsService.getSnapshotData(this.params).subscribe(res => {
  //         this.snapShotData = res.data.spot_states;
  //         this.tempSnapShotData = this.snapShotData;
  //         this.MedianDuration = res.data.median_duration;
  //         this.VacantData = res.data.spot_states.length - res.data["occupiers"];
  //         this.OccupiedData = res.data["occupiers"];

  //         if (this.status_selected != "all") {
  //           let data = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));

  //           data.forEach(elementSnapShotData => {
  //             this.durationColors.forEach((elementDurationColors) => {
  //               if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
  //                 elementSnapShotData.color = elementDurationColors.color;
  //               } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
  //                 elementSnapShotData.color = elementDurationColors.color;
  //               }
  //             });
  //           });
  //           this.snapShotData = data;
  //           this.total = this.snapShotData.length;
  //           this.datas.data = data;
  //         } else {
  //           this.snapShotData.forEach(elementSnapShotData => {
  //             this.durationColors.forEach((elementDurationColors) => {
  //               if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
  //                 elementSnapShotData.color = elementDurationColors.color;
  //               } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
  //                 elementSnapShotData.color = elementDurationColors.color;
  //               }
  //             });
  //           });
  //         }


  //         // Pagination
  //         if (paginator != undefined) {

  //           let StartPageIndex = paginator.pageIndex * paginator.pageSize;
  //           let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
  //           this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
  //             data.push(item);
  //           });
  //         } else {
  //           this.snapShotData.slice([0], [10]).map((item, i) => {
  //             data.push(item);
  //           });
  //           this.page = 1;
  //         }
  //         this.total = this.snapShotData.length;
  //         this.datas.data = data;
  //         if (isSlider) {
  //           console.log("there");
  //           console.log(this.snapShotData);
  //           this.scopeMapData = this.tempScopeMapData;
  //           console.log(this.scopeMapData);

  //         }
  //       });
  //     } else {

  //       // Pagination
  //       if (paginator != undefined) {
  //         let StartPageIndex = paginator.pageIndex * paginator.pageSize;
  //         let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
  //         this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
  //           data.push(item);
  //         });
  //       } else {
  //         this.snapShotData.slice([0], [10]).map((item, i) => {
  //           data.push(item);
  //         });
  //         this.page = 1;
  //       }
  //       // console.log(this.snapShotData)
  //       this.total = this.snapShotData.length;
  //       this.datas.data = data;
  //     }



  //     // get colors based on duration


  //   }
  //   // console.log(this.scopeMapData);
  //   // console.log(this.snapShotData);

  // }

  // async getVacantData(timestamp?: any) {
  //   if(timestamp != undefined) {
  //     this.params.timestamp = timestamp;
  //   } else {
  //     this.params.timestamp = this.currentTimestamp;
  //   }
  //   await this._reportsService.getVacantData(this.params).subscribe(res => {
  //     this.VacantData = res.data;
  //   });
  // }

  // async getOccupiedData(timestamp?: any) {
  //   if(timestamp != undefined) {
  //     this.params.timestamp = timestamp;
  //   } else {
  //     this.params.timestamp = this.currentTimestamp;
  //   }
  //   await this._reportsService.getOccupiedData(this.params).subscribe(res => {
  //     this.OccupiedData = res.data;
  //   });
  // }

  objectKeys(obj) {
    return Object.values(obj);
  }

  // ToggleNav() {
  //   let firstCol = document.getElementById("firstCol");
  //   let imageContainer = document.getElementById("imageContainer");

  //   if (this.toggleNav) {
  //     this.toggleNav = false;
  //     firstCol.style.width = this.imageSize.width;
  //     firstCol.style.height = this.imageSize.height;
  //     imageContainer.classList.remove('image_overflow');
  //   } else {

  //     firstCol.style.removeProperty('width');
  //     firstCol.style.removeProperty('height');
  //     imageContainer.classList.add('image_overflow');
  //     this.toggleNav = true;
  //   }
  // }

  getCurrentTimeStamp() {
    let date = new Date();
    date.setHours(date.getHours()); // subtract 5 hours to match parquery server timezone
    date.setMinutes(date.getMinutes()); // subtract 30 minutes to match parquery server timezone
    this.currentTimestamp = Math.floor(new Date(date).getTime() / 1000);
    this.selectedTime = this.currentTimestamp;
    this.sliderValue = this.currentTimestamp;

  }


  async durationFilter(value: any) {
    let event = { value: value };
    // this.snapShotData = this.tempSnapShotData;
    // this.scopeMapData = this.tempScopeMapData;
    //  console.log(this.scopeMapData);
    //  console.log(this.snapShotData)
    if (this.selectedView == 1) {
      // this.scopeMapData = this.cameraScopeData
      let data = this.objectKeys(this.mainScopeData.data.cameras[this.cameras[this.selectedCamera]].spots);
      this.scopeMapData = data;
      let formattedSanpShotdata = [];
      for (let data of this.tempSnapShotData) {
        if (this.cameras[this.selectedCamera] === data.camera_id) {
          formattedSanpShotdata.push(data);
        }
      }
      this.snapShotData = formattedSanpShotdata;
    } else {
      this.scopeMapData = this.tempScopeMapData;
      this.snapShotData = this.tempSnapShotData;
    }
    if (event.value == DURATION[0].value) {
      if (this.status_selected == STATUS[0].value) {
        let formattedSnapshotData = [];
        this.snapShotData.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        this.total = this.snapShotData.length;
        this.datas.data = formattedSnapshotData;
        this.page = 1;
      } else {
        let data = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));
        let formattedSnapshotData = [];
        let formattedScopeData = [];
        data.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        if (this.selectedView == 1) {
          await this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.external_id) {
                formattedScopeData.push(element);
              }
            });
          });
        } else {

          await this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
                formattedScopeData.push(element);
              }
            });
          });
        }
        this.snapShotData = data;
        this.scopeMapData = formattedScopeData;
        this.page = 1;
        this.total = data.length;
        this.datas.data = formattedSnapshotData
      }
      // this.snapShotData = this.tempSnapShotData;
      // this.scopeMapData = this.tempScopeMapData;
      // let formattedSnapshotData = [];
      // let formattedScopeData = [];

      // this.snapShotData.slice([0], [10]).map((item, i) => {
      //   formattedSnapshotData.push(item);
      // });

      // let data = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));

      // await this.scopeMapData.forEach(element => {
      //   data.forEach(element1 => {
      //     if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
      //       formattedScopeData.push(element);
      //     }
      //   });
      // });

      // this.snapShotData = data;
      // this.scopeMapData = formattedScopeData;

      // this.total = data.length;
      // this.datas.data = formattedSnapshotData;

      // console.log(this.snapShotData);
      // console.log(this.scopeMapData);

    } else {
      // this.datas.data = [];
      // let data = this.snapShotData.filter(element => element.duration > event.value);
      // let formattedSnapshotData = [];
      // let formattedScopeData = [];
      // data.slice([0], [10]).map((item, i) => {
      //   formattedSnapshotData.push(item);
      // });
      // await this.scopeMapData.forEach(element => {
      //   data.forEach(element1 => {
      //     if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
      //       formattedScopeData.push(element);
      //     }
      //   });
      // });
      // console.log(formattedScopeData);
      // this.snapShotData = data;
      // this.scopeMapData = formattedScopeData;

      // this.total = data.length;
      // this.datas.data = formattedSnapshotData;
      if (this.status_selected == STATUS[0].value) {
        let formattedSnapshotData = [];
        this.snapShotData.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        this.total = this.snapShotData.length;
        this.datas.data = formattedSnapshotData;
        this.page = 1;
      } else {
        let data1 = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));
        let data = data1.filter(element => element.duration > event.value);
        let formattedSnapshotData = [];
        let formattedScopeData = [];
        data.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        if (this.selectedView == 1) {
          await this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.external_id) {
                formattedScopeData.push(element);
              }
            });
          });
        } else {

          await this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
                formattedScopeData.push(element);
              }
            });
          });
        }
        this.snapShotData = data;
        this.scopeMapData = formattedScopeData;
        this.page = 1;
        this.total = data.length;
        this.datas.data = formattedSnapshotData
      }
    }
    console.log(this.scopeMapData);
    console.log(this.snapShotData);
  }


  async statusFilter(value: any) {
    let event = { value: value };
    this.status_selected = event.value;
    // this.snapShotData = this.tempSnapShotData;
    if (this.selectedView == 1) {
      // this.scopeMapData = this.cameraScopeData
      let data = this.objectKeys(this.mainScopeData.data.cameras[this.cameras[this.selectedCamera]].spots);
      this.scopeMapData = data;
      let formattedSanpShotdata = [];
      for (let data of this.tempSnapShotData) {
        if (this.cameras[this.selectedCamera] === data.camera_id) {
          formattedSanpShotdata.push(data);
        }
      }
      this.snapShotData = formattedSanpShotdata;
      if (this.selectedZone != "1000") {
        let formattedScopeData = []
        await this.scopeMapData.forEach(element => {
          this.snapShotData.forEach(element1 => {
            if (element1.spot_id == element.external_id) {
              formattedScopeData.push(element);
            }
          });
        });
        this.scopeMapData = formattedScopeData
      }
      console.log(this.snapShotData);
      console.log(this.scopeMapData);
      // let data = [];
      // for (let element of this.cameraScopeData){
      //   for (let inner_element of this.snapShotData){
      //     if (element.external_id === inner_element.spot_id) {
      //       data.push(element);
      //     } 
      //   }
      // }
      // this.scopeMapData = data;
    } else {
      this.snapShotData = this.tempSnapShotData;
      if (this.selectedZone == "1000") {
        this.scopeMapData = this.tempScopeMapData;
      } else {
        let formattedScopeData = [];
        await this.tempScopeMapData.forEach(element => {
          this.snapShotData.forEach(element1 => {
            if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
              formattedScopeData.push(element);
            }
          });
        });
        this.scopeMapData = formattedScopeData
        console.log(this.scopeMapData);
        console.log(this.snapShotData);
      }
      console.log(this.scopeMapData);
      console.log(this.snapShotData);
      console.log(this.selectedZone);
    }
    let duration = document.getElementById("duration");
    if (event.value == STATUS[1].value) {
      duration.style.display = "block";
    } else {
      this.duration_selected = "0";
      duration.style.display = "none";
    }
    if (event.value == STATUS[0].value) {

      // this.snapShotData = this.tempSnapShotData;
      // this.scopeMapData = this.tempScopeMapData;
      let formattedSnapshotData = [];

      this.snapShotData.slice([0], [10]).map((item, i) => {
        formattedSnapshotData.push(item);
      });
      this.total = this.snapShotData.length;
      this.datas.data = formattedSnapshotData;
      this.page = 1;
    } else {
      let data = this.snapShotData.filter(element => element.occupied == eval(event.value));
      // let data;
      // if (this.duration_selected == DURATION[0].value) {
      //   data =  data1;
      // } else {
      //   data = data1.filter(element => element.duration > event.value);
      // }
      let formattedSnapshotData = [];
      let formattedScopeData = [];
      data.slice([0], [10]).map((item, i) => {
        formattedSnapshotData.push(item);
      });
      // console.log(data)
      // console.log(this.scopeMapData)

      if (this.selectedView == 1) {
        await this.scopeMapData.forEach(element => {
          data.forEach(element1 => {
            if (element1.spot_id == element.external_id) {
              formattedScopeData.push(element);
            }
          });
        });
      } else {

        await this.scopeMapData.forEach(element => {
          data.forEach(element1 => {
            if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
              formattedScopeData.push(element);
            }
          });
        });
      }



      this.snapShotData = data;
      this.scopeMapData = formattedScopeData;
      this.page = 1;
      this.total = data.length;
      this.datas.data = formattedSnapshotData;
      console.log(this.scopeMapData);
      console.log(this.snapShotData);
    }
  }


  getPrevious24Hours() {
    let date = new Date();
    date.setDate(date.getDate() - 1) // subtract 1 day
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    this.previousTimestamp = Math.floor(new Date(date).getTime() / 1000);
  }

  sliderData(event: any) {
    console.log(this.selectedFloor);
    console.log(FLOORS);
    console.log(this.withImage);
    if (FLOORS[this.selectedFloor] == FLOORS[0]) {
      this.disableZone = false;
      this.selectedZone = "1000";
    } else {
      this.disableZone = true;
      this.selectedZone = "1000";
    }

    this.status_selected = 'all';
    this.duration_selected = '0';
    // this.selectedMap = "0";
    // this.selectedView = "0";
    this.selectedView = "0";
    this.selectedMap = "0";
    this.selectedCamera = "0";
    this.IMAGE_SRC = this.tempImageSrc;
    this.imageSize = this.tempImageSize;
    this.withImage = false;
    let cameraView = document.getElementById("cameras");
    // let duration = document.getElementById("duration");
    // duration.style.display = "none";
    cameraView.style.display = "none";
    // this.status_selected = 'all';
    let duration = document.getElementById("duration");
    duration.style.display = "none";
    this.selectedTime = event.value;
    this.sliderValue = this.selectedTime;
    this.snapShotData = [];
    this.scopeMapData = [];
    // this.status_selected = undefined;
    // this.scopeMapData = this.tempScopeMapData;
    // this.snapShotData = this.tempSnapShotData;
    // console.log(this.snapShotData);
    console.log(this.scopeMapData);
    // this.getSnapshotData(undefined, event.value, undefined, true);
    // this.getVacantData(event.value);
    // this.getOccupiedData(event.value);
  }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapviewComponent, {
      width: this.imageSize.width + 100,
      height: this.imageSize.height,
      data: { snapShotdata: this.snapShotData, size: this.imageSize, scopedata: this.scopeMapData, imageUrl: this.IMAGE_SRC, withImage: this.withImage }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  async getLocations(building?: any) {
    this.mainScopeData = undefined;
    this.selectedView = undefined;
    this.selectedMap = "0";

    await this._reportsService.getLocations().subscribe(res => {
      this.locationsData = res.data["locations"];
      // let index = this.locationsData.findIndex(item => item === event.value);
      this.selectedFloor = "0";
      // this.selectedZone = "0";
      let floorName;
      let floorValue;
      if (building == undefined) {
        this.floorsData = this.locationsData[0]["floors"];
        this.zonesData = this.floorsData[0]["zones"];
        this.user = this.locationsData[0].user;
        this.user_password = this.locationsData[0].password;
        this.buildingUrl = this.locationsData[0].parqueryValue;
        this.IMAGE_SRC = this.locationsData[0]["floors"][0].parqueryValue;
        floorName = this.locationsData[0]["floors"][0].name;
        floorValue = this.locationsData[0]["floors"][0].value;
      } else {
        this.floorsData = this.locationsData[building]["floors"];
        this.zonesData = this.floorsData[0]["zones"];
        this.user = this.locationsData[building].user;
        this.user_password = this.locationsData[building].password;
        this.buildingUrl = this.locationsData[building].parqueryValue;
        this.IMAGE_SRC = this.locationsData[building]["floors"][0].parqueryValue;
        floorName = this.locationsData[building]["floors"][0].name;
        floorValue = this.locationsData[building]["floors"][0].value;
      }
      // if (building == 1) {
      //   this.zonesData = this.floorsData[1]["zones"]
      // } else {
      //   this.zonesData = this.floorsData[0]["zones"]
      // }

      this.tempImageSrc = this.IMAGE_SRC;

      //on load
      let obj = {
        user: this.user,
        password: this.user_password,
        buildingUrl: this.buildingUrl,
        floor: floorName,
        floorValue: floorValue,
        withImage: true,
        zone: ""
      }
      // if (floorName == FLOORS[1].viewValue || floorName == FLOORS[2].viewValue) {
      //   this.disableZone = true;
      //   this.selectedZone = "1000";
      // } else {
      //   this.disableZone = false;
      //   this.selectedZone = "1000";
      // }
      this.disableZone = false;
      this.selectedZone = "1000";
      this.params = obj;
      this.getScopeData();
      // this.getVacantData();
      // this.getOccupiedData();
    });

  }

  getFloors(value: any) {
    console.log(value);
    let event = { value: value };
    this.scopeMapData = [];
    // this.status_selected = 'all';
    // this.duration_selected = '0';
    // let cameraView = document.getElementById("cameras");
    // let duration = document.getElementById("duration");
    // duration.style.display = "none";
    // cameraView.style.display = "none";
    // let index = this.locationsData.findIndex(item => item === event.value);
    this.floorsData = this.locationsData[event.value]["floors"];

    this.user = this.locationsData[event.value].user;
    this.user_password = this.locationsData[event.value].password;
    this.buildingUrl = this.locationsData[event.value].parqueryValue;
    this.withImage = false;

    console.log('--------------->'+this.currentTab);
    if(this.currentTab!=3){
      this.getLocations(event.value);
      // this.loadAggregateDataOnTabChange(this.currentTab);
    }
    else{
      this.getLocations(event.value);
      // this.loadAggregateDataOnTabChange(this.currentTab);
      this.loadAnprData();
    }
  }

  getMapData(value: any) {
    let event = { value: value };
    // this.status_selected = 'all';
    // this.duration_selected = '0';
    // let duration = document.getElementById("duration");
    // duration.style.display = "none";
    this.IMAGE_SRC = this.floorsData[event.value].parqueryValue;
    this.tempImageSrc = this.IMAGE_SRC;
    // this.view = [];
    // this.selectedView = VIEW[0].value;
    // this.selectedView = undefined;
    // let cameraView = document.getElementById("cameras");
    // cameraView.style.display = "none";
    this.selectedView = undefined;
    this.selectedMap = "0";
    this.zonesData = this.floorsData[event.value]["zones"]
    //on select
    let obj = {
      user: this.user,
      password: this.user_password,
      buildingUrl: this.buildingUrl,
      floor: this.floorsData[event.value].name,
      floorValue: this.floorsData[event.value].value,
      withImage: false,
      zone: ""
    }

    this.params = obj;
    this.getScopeData();
    // this.getVacantData();
    // this.getOccupiedData();
  }

  getZonesData(value: any) {
    // console.log(this.selectedZone);
    let event = { value: value };
    console.log(event);
    console.log(typeof this.selectedView);
    // return;
    this.status_selected = 'all';
    this.duration_selected = '0';
    // this.selectedMap = "0";
    // this.selectedView = "0";
    this.selectedView = "0";
    this.selectedMap = "0";
    this.selectedCamera = "0";
    this.IMAGE_SRC = this.tempImageSrc;
    this.imageSize = this.tempImageSize;
    let cameraView = document.getElementById("cameras");
    let duration = document.getElementById("duration");
    duration.style.display = "none";
    cameraView.style.display = "none";
    if (event.value == "1000") {
      this.params.zone = "";
      this.getScopeData();

    } else {
      this.params.zone = this.zonesData[event.value]["parqueryValue"];
      this.getScopeData();
    }
  }

  async viewChange(value: any) {
    let event = { value: value };
    let status = document.getElementById("status");
    this.selectedView = event.value;
    let cameraView = document.getElementById("cameras");
    if (VIEW[event.value].value == VIEW[0].value) {
      cameraView.style.display = "none";
      this.IMAGE_SRC = this.tempImageSrc;
      this.imageSize = this.tempImageSize;
      // console.log(this.scopeMapData);
      // console.log(this.snapShotData);
      this.snapShotData = this.tempSnapShotData;
      console.log(this.snapShotData);

      this.scopeMapData = [];
      let data = [];
      // console.log(FLOORS[this.selectedFloor].value, this.floorName)
      data = this.objectKeys(this.mainScopeData.data.visual_plans[this.floorName]["spots"]);
      // console.log(data)

      // this.snapShotData.forEach(element => {
      //   data.forEach(inner_element => {
      //     if (inner_element.spot_id == element.spot_id) {
      //       this.scopeMapData.push(inner_element);
      //     }
      //   });
      // });
      this.scopeMapData = data;
      this.VacantData = this.overallData.available;
      this.OccupiedData = this.overallData.occupied;
      // console.log(this.snapShotData);
      // console.log(this.scopeMapData);

      this.withImage = false;
      this.params.withImage = false;
      status.style.display = "block";

      if (this.status_selected != 'all') {
        // console.log(this.status_selected)
        this.durationFilter(this.duration_selected);
      } else {
        let data = [];
        this.snapShotData.slice([0], [10]).map((item, i) => {
          data.push(item);
        });
        this.datas.data = data;
        this.total = this.snapShotData.length;
        this.page = 1;
      }
      // if (this.duration_selected != "all"){
      //   this.durationFilter({ value: this.duration_selected });
      // }

    } else {
      if (this.status_selected != "all") {
        this.snapShotData = this.tempSnapShotData;
        this.scopeMapData = this.tempScopeMapData;
      }
      cameraView.style.display = "block";


      // if (this.params.zone != "") {
      //   this._utilityService.showAlert("Camera view is not avilable when zone is selected!");
      //   return;
      // }

      // console.log(this.scopeMapData);
      console.log(this.snapShotData);

      let data = [];
      this.cameraScopeData.forEach(element => {
        this.snapShotData.forEach(inner_element => {
          if (element.external_id === inner_element.spot_id) {
            data.push(element);
          }
        });
      });
      console.log(this.snapShotData);
      this.total = data.length;
      this.scopeMapData = data;
      this.imageSize = this.cameraImageSize;
      this.withImage = true;
      this.params.withImage = true;
      this.params.cameras = [this.cameras[0]];
      // this.selectedCamera = this.cameras[0];  
      this.selectedCamera = "0";
      this.getSnapshotCameraImage();
    }
    //  await this.getScopeData();
  }

  async cameraChange(value: any) {
    let event = { value: value };
    if (this.selectedView == 1) {
      this.imageSize = this.cameraImageSize;
      this.scopeMapData = this.cameraScopeData;
      this.withImage = true;
      this.scopeMapData = [];
      this.params.withImage = true;
      this.params.cameras = [this.cameras[event.value]];
      this.getSnapshotCameraImage();
    } else {
      this.view = VIEW;
      this.snapShotData = undefined;
      this.withImage = true;
      // if(this.selectedView == VIEW[0].value) {
      this.IMAGE_SRC = this.tempImageSrc;
      this.imageSize = this.tempImageSize;
      // } else {
      //   this.IMAGE_SRC = this.cameraImage;
      //   this.imageSize = this.cameraImageSize;
      // }
      this.selectedMap = "0";
      await this.getScopeData(this.cameras[event.value]);
    }
  }

  async getSnapshotCameraImage() {
    // console.log(this.params)
    await this._reportsService.getSnapshotData(this.params).subscribe(res => {
      this.IMAGE_SRC = "data:image/png;base64," + res.data.image;
      this.snapShotData = res.data.spot_states;
      this.datas.data = this.snapShotData;
      this.total = this.snapShotData.length;
      this.page = 1;
      this.VacantData = res.data.spot_states.length - res.data["occupiers"];
      this.OccupiedData = res.data["occupiers"];
      let formattedSnapshotData = [];
      // if (this.params.zone != "") {
      //   console.log("inside if");
      //   return;
      // } else {
      // console.log("inside else");
      let data = this.objectKeys(this.mainScopeData.data.cameras[this.params.cameras[0]].spots);

      this.scopeMapData = data;
      this.snapShotData.slice([0], [10]).map((item, i) => {
        formattedSnapshotData.push(item);
      });

      this.total = this.snapShotData.length;
      this.datas.data = formattedSnapshotData;
      if (this.status_selected == STATUS[0].value) {

        // this.snapShotData = this.tempSnapShotData;
        // this.scopeMapData = this.tempScopeMapData;
        let formattedSnapshotData = [];

        this.snapShotData.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        let formattedScopeData = []
        this.scopeMapData.forEach(element => {
          this.snapShotData.forEach(element1 => {
            if (element1.spot_id == element.external_id) {
              formattedScopeData.push(element);
            }
          });
        });
        this.total = this.snapShotData.length;
        this.datas.data = formattedSnapshotData;
        this.page = 1;
        this.scopeMapData = formattedScopeData;

      } else {
        let data1 = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));
        let data;
        if (this.duration_selected == DURATION[0].value) {
          data = data1;
        } else {
          data = data1.filter(element => element.duration > this.duration_selected);
        }
        let formattedSnapshotData = [];
        let formattedScopeData = [];
        data.slice([0], [10]).map((item, i) => {
          formattedSnapshotData.push(item);
        });
        if (this.selectedView == 1) {
          this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.external_id) {
                formattedScopeData.push(element);
              }
            });
          });
        } else {

          this.scopeMapData.forEach(element => {
            data.forEach(element1 => {
              if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
                formattedScopeData.push(element);
              }
            });
          });
        }



        this.snapShotData = data;
        this.scopeMapData = formattedScopeData;
        this.total = data.length;
        this.datas.data = formattedSnapshotData;
        this.page = 1;
      }

      this.snapShotData.sort((a, b) => {
        return a.spot_id - b.spot_id;
      });
      console.log(this.snapShotData);

      // get colors based on duration
      this.snapShotData.forEach(elementSnapShotData => {
        this.durationColors.forEach((elementDurationColors) => {
          if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
            elementSnapShotData.color = elementDurationColors.color;
          } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
            elementSnapShotData.color = elementDurationColors.color;
          }
        });
      });
      console.log(this.snapShotData);

      // console.log(this.scopeMapData)
      // this.statusFilter({ value: this.status_selected });
      // this.durationFilter({ value: this.duration_selected });

    });
  }

  async downloadVideo() {
    let formData: FormData = new FormData();
    formData.append('camera_id', 'cotesa-384');
    formData.append('spot_id', '9');
    formData.append('from_timestamp', '1599223000');
    formData.append('to_timestamp', '1599223963');

    await this._reportsService.downloadVideo(formData).subscribe(res =>
      this.downloadFile(res)),//console.log(data),
      error => console.log('Error downloading the file.'),
      () => console.info('OK');
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'video/mov' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  notify(element) {

    let data = {
      title: POPUP_MESSAGES.confrim,
      message: POPUP_MESSAGES.notify,
      yes: POPUP_MESSAGES.yes
    }
    this._utilityService.openDialog(data).subscribe(success => {

      if (success) {
        let data = {
          audience: NOTIFICATION_AUDIENCE[0].value,
          message: PARKED_LONG,
          scheduleType: SENDNOW,
          title: PARKED_LONG,
          single: true,
          // vehicleId: element.vehicle_id  // uncomment this once vehicle id is available from API
          vehicleId: "MP09AB0044" // remove this line once vehicle id is available from API
        };

        this._reportsService.sendUserNotification(data).subscribe(res => {
          console.log(res);
          this._utilityService.showAlert(res.message);
        });
      }

    });
  }

  getLongDuration() {
    this._reportsService.getLongDuration().subscribe(res => {
      this.longHours = res.data.companyData.config.duration;
      this.longHours = this.longHours * 60 * 60;
    });
  }


  async getAggregateData(tabIndex?: any) {
    let data = {
      user: this.user,
      password: this.user_password,
      buildingUrl: this.buildingUrl,
      cameras: this.cameras,
      // range_from: this.previous7Days,
      // range_to: this.currentTimestamp
      range_from: Math.floor(new Date(this.selected.startDate).getTime() / 1000),
      range_to: Math.floor(new Date(this.selected.endDate).getTime() / 1000)
    }

    var array_resp = [];

    await this._reportsService.getAggregateData(data).subscribe(res => {
      console.log(res);
      // this.aggregateResponse = {};
      this.aggregateResponse = res;
      this.loadAggregateDataOnTabChange(this.currentTab);
    });
  }

  getPrevious7days() {
    let date = new Date();
    date.setDate(date.getDate() - 7) // subtract 7 days
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    this.previous7Days = Math.floor(new Date(date).getTime() / 1000);
  }

  loadChartData(chart, chartName, result, color, yaxisText, unit, chartType) {
    let chartCommon = new Chart({
      chart: {
        zoomType: 'x',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: yaxisText
          // text: 'Occupancy (%)'
        },
        labels: {
          formatter: function () {
            return this.value + unit;
          }
        },
      }],

      series: <any>[{
        name: chartName,
        type: chartType,
        data: result,
        color: color
        // color: "#FFA500"

      }]
    });

    if (chart == 'occupancy') {
      this.occupancyChart = chartCommon;
    } else if (chart == 'inturnover') {
      this.inTurnoverChart = chartCommon;
    } else if (chart == 'outturnover') {
      this.outTurnoverChart = chartCommon;
    }else if(chart == 'entryin'){
      this.inEntryChart = chartCommon;
    }else if(chart == 'entryout'){
      this.outEntryChart = chartCommon;
    }
    else {
      this.medianDurationChart = chartCommon;
    }
    chartCommon.ref$.subscribe(console.log);
  }

  loadChartDataOccupancy(result) {
    // let i = 0;

    let occupancyChart = new Chart({
      chart: {
        zoomType: 'x',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: 'Occupancy (%)'
        },
        labels: {
          formatter: function () {
            return this.value + '%';
          }
        },
      }],

      series: <any>[{
        name: 'Occupancy rate',
        type: 'area',
        data: result,
        color: "#FFA500"

      }]
    });

    this.occupancyChart = occupancyChart;
    occupancyChart.ref$.subscribe(console.log);
  }

  loadTurnoverChart(in_data, out_data) {

    // this.loadDiv = true;
    let inChart = new Chart({
      chart: {
        zoomType: 'x',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: ''
        },
        // labels: {
        //   formatter: function () {
        //     return this.value + 'count';
        //   }
        // },
      }],

      series: <any>[{
        name: 'Incoming count',
        type: 'area',
        data: in_data,
        color: "#77b5fe"

      }]
    });

    this.inTurnoverChart = inChart;
    inChart.ref$.subscribe(console.log);

    let outChart = new Chart({
      chart: {
        zoomType: 'x',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: ''
        },
        // labels: {
        //   formatter: function () {
        //     return this.value + 'count';
        //   }
        // },
      }],

      series: <any>[{
        name: 'Outgoing count',
        type: 'line',
        data: out_data,
        color: "#77b5fe"
      }]
    });

    this.outTurnoverChart = outChart;
    outChart.ref$.subscribe(console.log);
  }

  loadMedianParkingDurationChart(result) {
    // let i = 0;

    let medianChart = new Chart({
      chart: {
        zoomType: 'x',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: 'Duration'
        },
        labels: {
          formatter: function () {
            return this.value + 'hrs';
          }
        },
      }],

      series: <any>[{
        name: 'Median duration',
        type: 'line',
        data: result,
        color: "#E129CD"

      }]
    });

    this.medianDurationChart = medianChart;
    medianChart.ref$.subscribe(console.log);
  }

  getMinBasedOnKey(data, key) {
    return data.reduce(function (prev, current) {
      return (prev[key] < current[key]) ? prev : current
    });
  }

  getMaxBasedOnKey(data, key) {
    return data.reduce(function (prev, current) {
      return (prev[key] > current[key]) ? prev : current
    });
    // var timestamp = data.reduce((max, p) => p[key] > max ? p[key] : max, data[0]['timestamp']);
    // return {max: max};
  }

  timeConvert(sec) {
    console.log(sec);
    var day = Math.floor(sec / (60 * 60 * 24));
    var hour = Math.floor((sec % (60 * 60 * 24)) / (60 * 60));
    var min = Math.floor(((sec % (60 * 60 * 24)) % (60 * 60)) / 60);
    console.log(day + ' : ' + hour + ' : ' + min);

    if (day > 0) {
      if (hour > 0) {
        if (min > 0) {
          return day + 'd ' + hour + 'h ' + min + 'm';
        } else {
          return day + 'd ' + hour + 'h';
        }
      } else {
        if (min > 0) {
          return day + 'd ' + min + 'm';
        } else {
          return day + 'd';
        }
      }
    } else if (hour > 0) {
      if (min > 0) {
        return hour + 'h ' + min + 'm';
      } else {
        return hour + 'h';
      }
    } else {
      return min + 'm';
    }
  }

  rangeClicked(range) {
    console.log('[rangeClicked] range is : ', range);
  }

  datesUpdated(range) {
    if (range.startDate == null) {
      return
    }
    if (range) {
      // console.log(typeof range.startDate);
      var datePipe = new DatePipe('en-US');
        this.startDate = datePipe.transform(range.startDate._d, 'yyyy-MM-dd');
        this.endDate = datePipe.transform(range.endDate._d, 'yyyy-MM-dd');
        
        if(this.currentTab!=3){
          this.getAggregateData();
          // this.getLocations(event.value);
          // this.loadAggregateDataOnTabChange(this.currentTab);
        }
        else{
          // this.getLocations(event.value);
          // this.loadAggregateDataOnTabChange(this.currentTab);
          this.loadAnprData();
        }

    // if(this.selectedSurveyId!=null){
    //   this.getReports();
    // }else{
    //   alert("Select a survey Id First");
    // }
    console.log('[datesUpdated] range is : ',  range.startDate._d +"   "+this.startDate+"   "+this.endDate);
    }
  }


  tabClick(tab) {
    this.currentTab = tab.index;
    if(this.currentTab!=3){
    this.loadAggregateDataOnTabChange(tab.index);
    }else {
      this.loadAnprData();
    }
  }

  async loadAnprData(){
    let data = {
      compLocationName: this.locationsData[this.selectedBuilding].name,
      fromDate: Math.floor(new Date(this.selected.startDate).getTime()),
      toDate: Math.floor(new Date(this.selected.endDate).getTime())
    }
    console.log(data);

    await this._reportsService.getAnprReportsData(data).subscribe(res => {
      console.log(res);
      this.inoutgraphData = res.data.inoutGraphData;
      this.totEntryCount = res.data.totalEntries;
      this.manEntryCount = res.data.manualEntries;
      this.autoEntryCount = res.data.automaticEntries;
      if(this.totEntryCount!=0){
        this.autoEntryCountPer = (res.data.automaticEntries/this.totEntryCount*100).toFixed(2);
        this.manEntryCountPer = (res.data.manualEntries/this.totEntryCount*100).toFixed(2);
        }else{
          this.autoEntryCountPer = 0;
        this.manEntryCountPer = 0;
        }
      this.guestEntryCount = res.data.guest;
      this.empEntryCount = res.data.employee;
      this.inCount = res.data.inCount;
      this.outCount = res.data.outCount;


      this.inEntryData=[];
      this.outEntryData=[];

      res.data.inoutGraphData.forEach(element => {
        let inEntryData = [];
        let outEntryData = [];
      
        inEntryData.push(element.timeStamp);
        inEntryData.push(parseInt(element.inCount));
        this.inEntryData.push(inEntryData);
  
        outEntryData.push(element.timeStamp);
        outEntryData.push(parseInt(element.outCount));
        this.outEntryData.push(outEntryData);
      });
  
      this.loadChartData("entryin","Entry In",this.inEntryData,"#66CD00","Count","","line");
      this.loadChartData("entryout","Entry Out",this.outEntryData,"#FF0004","Count","","line");  

      // this.aggregateResponse = res;
      // this.loadAggregateDataOnTabChange();
    });
  }

  loadAggregateDataOnTabChange(tabIndex?: any){
    console.log('----->received'+tabIndex);
    this.aggregateData = [];
    this.occupancyVariationData = [];
    this.inTurnoverData = [];
    this.outTurnoverData = [];
    this.medianDurationData = [];

    this.avg_occupancy = this.aggregateResponse.data.global_all.avg_occupancy.toFixed(1);
    this.global_all = this.aggregateResponse.data.global_all;
    let data = this.aggregateResponse.data.list_all.aggregations;
    this.dataWeekly = this.aggregateResponse.data.list_all.aggregations;
    var spot_wise_data = this.aggregateResponse.data.global_per_spot;
    let camera_spots = Object.keys(spot_wise_data);
    // Step 2. Create an empty array.
    let array_resp = [];
    // Step 3. Iterate throw all keys.
    for (let spots of camera_spots) {
      // console.log(prop);
      let spot_data = Object.keys(spot_wise_data[spots]);
      let data_obj = {}
      for (let data of spot_data) {
        data_obj[data] = spot_wise_data[spots][data];
      }
      let spot_camera = spots.split('/')
      data_obj['camera_id'] = spot_camera[0];
      data_obj['spot_id'] = spot_camera[1];
      array_resp.push(data_obj);
    }

    this.arraySpotWiseResponse = array_resp;
    // this.loadAggregateDataOnTabChange()
    // await this.arraySpotWiseResponse.sort((a, b) => {
    //   return a.spot_id - b.spot_id;
    // });

    // @shivkumar array_resp is the final array spot wise data

    data.forEach(element => {
      let occupancyData = [];
      let inData = [];
      let outData = [];
      let medianData = [];
      occupancyData.push(element.timestamp * 1000);
      occupancyData.push(parseInt(element.avg_occupancy));
      this.occupancyVariationData.push(occupancyData);

      inData.push(element.timestamp * 1000);
      inData.push(parseInt(element.total_inflow));
      this.inTurnoverData.push(inData);

      outData.push(element.timestamp * 1000);
      outData.push(parseInt(element.total_outflow));
      this.outTurnoverData.push(outData);

      medianData.push(element.timestamp * 1000);
      medianData.push(parseFloat((element.median_duration / 3600).toFixed(2)));
      this.medianDurationData.push(medianData);
    });

    this.loadChartData("occupancy", "Ocupancy rate", this.occupancyVariationData, "#FFA500", "Occupancy (%)", "%", "area");
    this.loadChartData("inturnover", "Incoming count", this.inTurnoverData, "#77b5fe", "", "", "line");
    this.loadChartData("outturnover", "Outgoing count", this.outTurnoverData, "#77b5fe", "", "", "line");
    this.loadChartData("medianduration", "Median Duration", this.medianDurationData, "#E129CD", "Duration (hrs)", "hrs", "line");

    // this.loadChartDataOccupancy(this.occupancyVariationData);
    // this.loadTurnoverChart(this.inTurnoverData, this.outTurnoverData);
    // this.loadMedianParkingDurationChart(this.medianDurationData);


    this.minOccupancy = this.getMinBasedOnKey(this.dataWeekly, 'avg_occupancy');
    this.maxOccupancy = this.getMaxBasedOnKey(this.dataWeekly, 'avg_occupancy');
    this.minTurnover = this.getMinBasedOnKey(array_resp, 'total_inflow');
    this.maxTurnover = this.getMaxBasedOnKey(array_resp, 'total_inflow');
    this.minMedianDuration = this.getMinBasedOnKey(array_resp, 'median_duration');
    this.maxMedianDuration = this.getMaxBasedOnKey(array_resp, 'median_duration');

    var avgScore = array_resp.reduce(function (r, person) {
      // if (person.name === "John") {
      r.sum += +person.total_inflow;
      r.avg = r.sum / ++r.count;
      // }
      return r;
    }, { sum: 0, count: 0, avg: 0 }).avg;

    this.averageTurnover = avgScore;
    // console.log(avgScore);

      

       this.minMedianDurationTime = this.timeConvert(this.minMedianDuration.median_duration);
       this.maxMedianDurationTime = this.timeConvert(this.maxMedianDuration.median_duration);

       this.medianDuration = this.timeConvert(this.global_all.median_duration);
       this.totalDuration = this.timeConvert(this.global_all.total_duration);
       
      this.arraySpotWiseResponse.forEach(element => {
        let data = {};
        // console.log(element.spot_id);
        if(tabIndex == 1) {
          data = { "spot_id": element.spot_id, "data": parseInt(element.total_inflow), "camera_id": element.camera_id, "color": "rgb(119, 181, 254,", "name": "Total Inflow" }
          
          // if (parseInt(element.total_inflow) > 50) {
          //   data = { "spot_id": element.spot_id, "data": parseInt(element.total_inflow), "camera_id": element.camera_id, "color": "red", "name": "Total Inflow" }
          // } else {
          //   data = { "spot_id": element.spot_id, "data": parseInt(element.total_inflow), "camera_id": element.camera_id, "color": "green", "name": "Total Inflow" }
          // }
        } else if(tabIndex == 2) {
            data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "rgb(225, 41, 205,", "name": "Median Duration" }
          // if (parseInt(element.median_duration) > 36000) {
          //   data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "red", "name": "Median Duration" }
          // } else {
          //   data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "green", "name": "Median Duration" }
          // }
        } else if(tabIndex == 3) {
          data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "rgb(255, 255, 255)", "name": "Median Duration" }
        // if (parseInt(element.median_duration) > 36000) {
        //   data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "red", "name": "Median Duration" }
        // } else {
        //   data = { "spot_id": element.spot_id, "data": element.median_duration, "camera_id": element.camera_id, "color": "green", "name": "Median Duration" }
        // }
      }
        else {
            data = { "spot_id": element.spot_id, "data": parseFloat(element.avg_occupancy).toFixed(2), "camera_id": element.camera_id, "color": "rgb(255, 165, 0,", "name": "Avg. Occupancy" }

          // if (parseInt(element.avg_occupancy) > 50) {
          //   data = { "spot_id": element.spot_id, "data": parseInt(element.avg_occupancy), "camera_id": element.camera_id, "color": "red", "name": "Avg. Occupancy" }
          // } else {
          //   data = { "spot_id": element.spot_id, "data": parseInt(element.avg_occupancy), "camera_id": element.camera_id, "color": "green", "name": "Avg. Occupancy" }
          // }
        }
      
        

      this.aggregateData.push(data);
    });

    // this.aggregateData.sort((a, b) => {
    //   return a.spot_id - b.spot_id;
    // });
    console.log(this.aggregateData)
  }

  downloadOccupancyData(chart) {
  
    let data = JSON.parse(JSON.stringify(this.aggregateResponse.data.list_all.aggregations));
    // Object.assign({}, this.aggregateResponse.data.list_all.aggregations);
   
    if(chart=='occupancy'){
      data.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timestamp*1000).format("DD-MM-YYYY h:mm:ss");;
        item.occupancy = item.avg_occupancy;
        delete item.timestamp; 
        delete item.avg_occupancy;
        delete item.median_duration;
        delete item.total_inflow;
        delete item.total_outflow;
        return item; 
    });
      this.excelService.exportAsExcelFile(data, 'AVERAGE_OCCUPANCY_REPORT');
    }else if(chart=='incoming_vehicles'){
      data.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timestamp*1000).format("DD-MM-YYYY h:mm:ss");;
        item.incount = item.total_inflow;
        delete item.timestamp; 
        delete item.avg_occupancy;
        delete item.median_duration;
        delete item.total_inflow;
        delete item.total_outflow;
        return item; 
    });
      this.excelService.exportAsExcelFile(data, 'TURNOVER_INCOMING_REPORT');
    }else if(chart=='outgoing_vehicles'){
      data.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timestamp*1000).format("DD-MM-YYYY h:mm:ss");;
        item.outcount = item.total_outflow;
        delete item.timestamp; 
        delete item.avg_occupancy;
        delete item.median_duration;
        delete item.total_inflow;
        delete item.total_outflow;
        return item; 
    });
      this.excelService.exportAsExcelFile(data, 'TURNOVER_OUTGOING_REPORT');
    }else if(chart=='median_duration'){
      data.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timestamp*1000).format("DD-MM-YYYY h:mm:ss");;
        item.medianduration = item.median_duration;
        delete item.timestamp; 
        delete item.avg_occupancy;
        delete item.median_duration;
        delete item.total_inflow;
        delete item.total_outflow;
        return item; 
    });
      this.excelService.exportAsExcelFile(data, 'MEDIAN_DURATION_REPORT');
    }else if(chart=='in_anpr_data'){
      let datainoutGraph = JSON.parse(JSON.stringify(this.inoutgraphData));
      datainoutGraph.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timeStamp).format("DD-MM-YYYY h:mm:ss");;
        item.incount = item.inCount;
        delete item.inCount;
        delete item.outCount;
        delete item.timeStamp;
        return item; 
    });
      this.excelService.exportAsExcelFile(datainoutGraph, 'ANPR_IN_ENTRIES_COUNT_REPORT');
    }else if(chart=='out_anpr_data'){
      let datainoutGraph = JSON.parse(JSON.stringify(this.inoutgraphData));
      datainoutGraph.map(function(item) {
        // item.date = moment(item.timestamp*1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        item.time =  moment(item.timeStamp).format("DD-MM-YYYY h:mm:ss");;
        item.outcount = item.outCount;
        delete item.inCount;
        delete item.outCount;
        delete item.timeStamp;
        return item; 
    });
      this.excelService.exportAsExcelFile(datainoutGraph, 'ANPR_OUT_ENTRIES_COUNT_REPORT');
    }

  }
}
