import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardService } from '../service/dashboard.service';
import { TRIP_TYPE, STATUS, FLOORS, VIEW, } from 'src/app/constant/app-constant';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as _moment from "moment";
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FormControl } from '@angular/forms';
import { MapviewComponent } from '../mapview/mapview.component';
import { MatPaginator, MatTableDataSource, MatGridTileFooterCssMatStyler } from '@angular/material';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { element } from 'protractor';
import { Pagination } from '../../../../../models/pagination';
import { ExcelService } from "src/app/modules/shared/services/excel.service";
import { DateRangeModalComponent } from 'src/app/modules/shared/components/date-range-modal/date-range-modal.component';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { inflate } from 'zlib';
import { HttpResponseBase } from '@angular/common/http';
import { even } from '@rxweb/reactive-form-validators';
const moment = _moment;

export const MY_FORMATS = {  // For year and month picker
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  providers: [],
})
export class DashboardListComponent extends Pagination implements OnInit {

  datas = new MatTableDataSource<Snapshot.Detail>([]);
  // displayedColumns = ['position', 'numPlate', 'inTime', 'userType', 'userName'];
  displayedColumns = ['position', 'numPlate', 'userName', 'userType', 'inTime', 'outTime', 'type', 'modal', 'entryType', 'companyLocationName', 'status','event', 'ocr'];

  total: number;
  IMAGE_SRC: any;
  scopeMapData: any;
  snapShotData: any;
  tempScopeMapData: any;
  tempSnapShotData: any;
  durationColors: any;
  VacantData: number;
  OccupiedData: number;
  MedianDuration: any;
  toggleNav: boolean;
  imageSize: any;
  currentTimestamp: any;
  previous7Days: any;
  SliderTimestamp: any;
  status = STATUS;
  view: any;
  locationsData: any = [];
  floorsData: any;
  user: any;
  user_password: any;
  buildingUrl: any;
  params: any;
  cameras: any;
  selectedTime: any;
  sliderDisabled: boolean;
  sliderValue: any;

  tempImageSize: any;
  tempImageSrc: any;
  withImage: boolean;
  selectedView: any;
  selectedBuilding = "0";
  seletedFloor: any;
  manualEntriesCount: any;
  guestCount: any;
  employeeCount: any;
  employeeCountNew: number = 0;
  guestCountNew: number = 0
  occupancyVariationData = [];
  overallCameraIds = [];
  overallFloorsData = [];
  overallTotalCount = [];
  overallOccupiedCount = [];
  overallOccupiedData = [];
  mostOccupiedData: any;
  buildingCameras: any;
  mostOccupiedResult: any;
  leastOccupiedResult: any;
  selectedStatus: 'all'
  totalInFlowData = [];
  totalOutFlowData = [];
  dataWeekly = [];
  dataWeeklyForInout = [];
  cardData:any ={};
  totalSpots;
  totalAvailableSpots=0;
  availablePercentage;
  occupiedPercentage;
  real_time_entries;
  occupiedSlots = 0;
  snapShot_interval;

  // public lineChartData: ChartDataSets[] = [
  //   { data: this.occupancyVariationData, label: 'Occupancy Variation' },
  // ];
  public lineChartLabels: Label[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public lineChartCustomerData: ChartDataSets[] = [
    { data: [10, 50, 20, 5, 15, 45, 25, 35, 49], label: 'Customers' },
  ];
  public lineChartCustomerLabels: Label[] = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', 'tt'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  occupancyChart: Chart;
  inOutChart: Chart;
  progressChart = [];

  constructor(private _dashBoardService: DashboardService, private dialog: MatDialog, private excelService: ExcelService, private _utilityService: UtilityService) {
    super();
  }
  ngOnInit() {

    this.getCurrentTimeStamp();
    setInterval(() => {
    this.getCurrentTimeStamp();
      }, 60 * 1000);

    this.getPrevious7days();
    this.getLocations();
    this.getManualCount();

    this.getDashBoardData();

    // this.loadProgressBarChart();
  }

  /*
       Method For Sorting
   */
  getDashBoardData() {
    this._dashBoardService.getDashBoard().subscribe(res => {
      if (res) {
        this.cardData = res.data
      }
    });
  }
  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getSnapshotData(true);
  }

// changePage(event: MatPaginator) {
//   this.pageOptionsOnChange = event;
//   if (this.total == 0) {
//     return;
//   }
//   // console.log(event);
//   // this.getManualEntries(event,true);
// }

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapviewComponent, {
      width: this.imageSize.width,
      height: this.imageSize.height,
      data: { snapShotdata: this.snapShotData, size: this.imageSize, scopedata: this.scopeMapData, imageUrl: this.IMAGE_SRC, withImage: this.withImage }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  async getLocations(building?: any) {
    this.selectedStatus = 'all'
    await this._dashBoardService.getLocations().subscribe(res => {
      this.locationsData = res.data["locations"];
      // let index = this.locationsData.findIndex(item => item === event.value);
      // console.log(this.locationsData);
      this.seletedFloor = "0";
      let floorName;
      let floorValue;
      if (building == undefined) {
        this.floorsData = this.locationsData[0]["floors"];
        // console.log(this.floorsData);
        this.user = this.locationsData[0].user;
        this.user_password = this.locationsData[0].password;
        this.buildingUrl = this.locationsData[0].parqueryValue;
        this.IMAGE_SRC = this.locationsData[0]["floors"][0].parqueryValue;
        floorName = this.locationsData[0]["floors"][0].name;
        floorValue = this.locationsData[0]["floors"][0].value;
      } else {
        this.floorsData = this.locationsData[building]["floors"];
        this.user = this.locationsData[building].user;
        this.user_password = this.locationsData[building].password;
        this.buildingUrl = this.locationsData[building].parqueryValue;
        this.IMAGE_SRC = this.locationsData[building]["floors"][0].parqueryValue;
        floorName = this.locationsData[building]["floors"][0].name;
        floorValue = this.locationsData[building]["floors"][0].value;
      }

      this.tempImageSrc = this.IMAGE_SRC;
      //on load
      let obj = {
        user: this.user,
        password: this.user_password,
        buildingUrl: this.buildingUrl,
        floor: floorName,
        floorValue: floorValue,
        withImage: true
      }

      this.params = obj;
      this.getScopeData();
      this.getInoutGraphData();
      this.overallTotalCount = [];
      this.overallFloorsData = [];
      this.overallCameraIds = [];
     
     
    this.getManualEntries(true);
    this.real_time_entries = setInterval(() => {
      this.getManualEntries(false); 
    }, 5000);
    this.getManualCount();

    });
  }


  getFloors(event: any) {
    this.overallOccupiedCount = [];
    this.overallOccupiedData = [];
    // let index = this.locationsData.findIndex(item => item === event.value);
    this.floorsData = this.locationsData[event]["floors"];
    this.user = this.locationsData[event].user;
    this.user_password = this.locationsData[event].password;
    this.buildingUrl = this.locationsData[event].parqueryValue;
    this.page = 1;
    this.pageSize = 10;
    this.getLocations(event);


  }

  getMapData(value: any) {
    let event = { value: value };
    this.selectedStatus = 'all';
    this.IMAGE_SRC = this.floorsData[event.value].parqueryValue;
    this.tempImageSrc = this.IMAGE_SRC;
    this.view = [];
    this.selectedView = VIEW[0].value;

    //on select
    let obj = {
      user: this.user,
      password: this.user_password,
      buildingUrl: this.buildingUrl,
      floor: this.floorsData[event.value].name,
      floorValue: this.floorsData[event.value].value,
      withImage: false
    }

    this.params = obj;
    this.getScopeData();
  }

  async statusFilter(value: any) {
    this.snapShotData = this.tempSnapShotData;
    this.scopeMapData = this.tempScopeMapData;
    let event = { value: value };
    if (event.value == STATUS[0].value) {
      let formattedSnapshotData = [];
      let formattedScopeData = [];


      await this.scopeMapData.forEach(element => {
        this.snapShotData.forEach(element1 => {
          if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
            formattedScopeData.push(element);
            formattedSnapshotData.push(element1)
          }
        });
      });

      this.snapShotData = formattedSnapshotData;
      this.scopeMapData = formattedScopeData;

    } else {

      let data = this.snapShotData.filter(element => element.occupied == eval(event.value));
      let formattedSnapshotData = [];
      let formattedScopeData = [];


      await this.scopeMapData.forEach(element => {
        data.forEach(element1 => {
          if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
            formattedScopeData.push(element);
            formattedSnapshotData.push(element1)
          }
        });
      });


      this.snapShotData = formattedSnapshotData;
      this.scopeMapData = formattedScopeData;

    }
  }

  getCurrentTimeStamp() {
    // setInterval(() => {
      let date = new Date();
      date.setHours(date.getHours()); // subtract 5 hours to match parquery server timezone
      date.setMinutes(date.getMinutes()); // subtract 30 minutes to match parquery server timezone
      this.currentTimestamp = Math.floor(new Date(date).getTime() / 1000);
      // }, 5000);
  }

  objectKeys(obj) {
    return Object.values(obj);
  }

  cameraObjectKeys(obj) {
    return Object.keys(obj);
  }

  async getSnapshotData(isLoad) {
    this.params.timestamp = this.currentTimestamp;
    this.params.withImage = false;
    this.occupiedSlots = 0;
    // this.params.cameras = this.cameras;
    await this._dashBoardService.getSnapshotData(this.params, isLoad).subscribe(res => {
      // console.log(res);
      this.employeeCountNew = 0;
      this.guestCountNew = 0;
      this.snapShotData = res.data.spot_states;
      this.MedianDuration = res.data.median_duration;
      this.tempSnapShotData = this.snapShotData;
      this.employeeCountNew=0;
      this.guestCountNew=0;
      // Pagination
      this.progressChart = [];
      // console.log(this.floorsData);
      for (let each of this.snapShotData) {
        if (this.cameras.includes(each.camera_id)) {
          if ("vehicleDetails" in each) {
            if (each.occupied == true) {
              this.employeeCountNew += 1;
              // console.log(each.spot);
            }
          } else {
            if (each.occupied == true) {
              this.guestCountNew += 1;
            }
          }
        }
      }
      for (let floor of this.floorsData) {
        let chartSnapShotData = [];
        for (let data of this.snapShotData) {
          if (floor.cameras.includes(data.camera_id)) {
            chartSnapShotData.push(data);
          }
        }
        let totalSpots = chartSnapShotData.length;
        let totalAvailableSpots = 0;
        for (let spot of chartSnapShotData) {
          if (spot.occupied == false) {
            totalAvailableSpots += 1;
          }
        }
        let availablePercentage = (totalAvailableSpots / totalSpots * 100).toFixed(2);
        let occupiedPercentage = parseFloat((100 - parseFloat(availablePercentage)).toFixed(2));
        this.loadProgressBarChart(floor.name, occupiedPercentage, totalSpots - totalAvailableSpots, totalSpots);
      }

      this.overallFloorsData = [];
      this.overallCameraIds.forEach((element, index) => {
        let data = [];
        element.cameras.forEach(inner_element => {
          data.push(this.snapShotData.filter(element => element.camera_id == inner_element));
        });
        this.overallFloorsData.push(data);
      });

      this.overallFloorsData.forEach((element, index) => {
        let length = 0;
        let occupied = [];
        element.forEach(inner_element => {
          occupied.push(inner_element.filter(occupied_element => occupied_element.occupied == true));
          length = inner_element.length + length;
        });
        this.overallTotalCount.push(length);
        this.overallOccupiedData.push(occupied);
      });

      this.overallOccupiedData.forEach(element => {
        let length = 0;
        element.forEach(inner_element => {
          length = inner_element.length + length;

        });
        this.overallOccupiedCount.push(length);
      });



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

      let formattedSnapshotData = [];
      let formattedScopeData = [];


      this.scopeMapData.forEach(element => {
        this.snapShotData.forEach(element1 => {
          if (element1.spot_id == element.spot_id && element1.camera_id == element.camera_id) {
            formattedScopeData.push(element);
            formattedSnapshotData.push(element1)
          }
        });
      });

      this.snapShotData = formattedSnapshotData;
      this.scopeMapData = formattedScopeData;
      this.totalSpots = this.snapShotData.length;
      this.totalAvailableSpots = 0;
      for (let spot of this.snapShotData) {
        if (spot.occupied == false) {
          this.totalAvailableSpots += 1;
        }
      }
      this.occupiedSlots = this.totalSpots - this.totalAvailableSpots;
      this.availablePercentage = (this.totalAvailableSpots / this.totalSpots * 100).toFixed(2);
      this.occupiedPercentage = (100 - this.availablePercentage).toFixed(2);

    });
    this.snapShot_interval = setInterval(async ()=> {
      this.getSnapshotData(false);
      console.log("test");
      // console.log("test");
    }, 30000);


  }

  async getScopeData(camera?: any) {
    // let firstCol = document.getElementById("firstCol");
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.add('image_overflow_dash');

    await this._dashBoardService.getScopeData(this.params).subscribe(res => {
      // console.log(res)
      this.scopeMapData = [];
      this.imageSize = [];
      this.cameras = [];
      this.buildingCameras = this.cameraObjectKeys(res.data["cameras"]);
      // if (this.params.floor == FLOORS[0].viewValue) {
      //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[0].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = res.data["visual_plans"][FLOORS[0].value]["image_size"];
      //   this.tempImageSize = res.data["visual_plans"][FLOORS[0].value]["image_size"];
      //   this.cameras = res.data["visual_plans"][FLOORS[0].value]["camera_ids"];
      //   console.log(this.cameras);

      // } else if (this.params.floor == FLOORS[1].viewValue) {
      //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[1].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = res.data["visual_plans"][FLOORS[1].value]["image_size"];
      //   this.tempImageSize = res.data["visual_plans"][FLOORS[1].value]["image_size"];
      //   this.cameras = res.data["visual_plans"][FLOORS[1].value]["camera_ids"];
      //   console.log(this.cameras);

      // } else if (this.params.floor == FLOORS[2].viewValue) {
      //   this.scopeMapData = this.objectKeys(res.data["visual_plans"][FLOORS[2].value]["spots"]);
      //   this.tempScopeMapData = this.scopeMapData;
      //   this.imageSize = res.data["visual_plans"][FLOORS[2].value]["image_size"];
      //   this.tempImageSize = res.data["visual_plans"][FLOORS[2].value]["image_size"];
      //   this.cameras = res.data["visual_plans"][FLOORS[2].value]["camera_ids"];
      //   console.log(this.cameras);

      // }
      this.scopeMapData = this.objectKeys(res.data["visual_plans"][this.params.floorValue]["spots"]);
      this.tempScopeMapData = this.scopeMapData;
      this.imageSize = res.data["visual_plans"][this.params.floorValue]["image_size"];
      this.tempImageSize = res.data["visual_plans"][this.params.floorValue]["image_size"];
      this.cameras = res.data["visual_plans"][this.params.floorValue]["camera_ids"];

      this.durationColors = res.data["duration_colors"];

      this.overallCameraIds = [];
      // console.log(this.floorsData);
      this.floorsData.forEach((element, index) => {
        let camera_ids;
        camera_ids = res.data["visual_plans"][this.params.floorValue]["camera_ids"];
        this.overallCameraIds.push({ cameras: camera_ids, id: this.params.floorValue });
        // console.log(index);
        // console.log(this.params.floor);
        // if (this.params.floor == FLOORS[0].viewValue) {
        //   console.log(FLOORS[index].value);
        //   camera_ids = res.data["visual_plans"][FLOORS[index].value]["camera_ids"];
        //   this.overallCameraIds.push({ cameras: camera_ids, id: FLOORS[index].value });
        // } else {
        //   camera_ids = res.data["visual_plans"][FLOORS[index + 1].value]["camera_ids"];
        //   this.overallCameraIds.push({ cameras: camera_ids, id: FLOORS[index + 1].value });
        // }
      });

      // firstCol.style.width = this.imageSize.width;
      // firstCol.style.height = this.imageSize.height;
      this.getSnapshotData(true);
      this.getOccupancyVariation();
    });
  }

  async getManualCount() {
    this.employeeCount = 0;
    this.guestCount = 0;
    this.manualEntriesCount = 0;
    let data = {
      compLocationName: this.locationsData[this.selectedBuilding]?this.locationsData[this.selectedBuilding].name:'',
      requestedPage: "manual"
    }
    await this._dashBoardService.getManualEntryCount(data).subscribe(res => {
      // console.log(res)
      // this.manualEntriesCount = res.data[0].count + res.data[1].count;
      // this.guestCount = res.data[1].count;
      // this.employeeCount = res.data[0].count
      res.data.forEach(elm => {
        if (elm.type == "reg_guests" || elm.type == "guest") {
          this.guestCount += elm.count;
        } else if (elm.type == "employee") {
          this.employeeCount = elm.count;
        }
      });
      this.manualEntriesCount = this.guestCount + this.employeeCount;

    });
  }


  async getOccupancyVariation() {
    let data = {
      user: this.user,
      password: this.user_password,
      buildingUrl: this.buildingUrl,
      cameras: this.cameras,
      range_from: this.previous7Days,
      range_to: this.currentTimestamp
    }

    await this._dashBoardService.getOccupancyVariation(data).subscribe(res => {
      this.occupancyVariationData = [];
      this.totalInFlowData = [];
      this.totalOutFlowData = [];
      let data = res.data.list_all.aggregations;
      this.dataWeekly = res.data.list_all.aggregations;
      this.mostOccupiedData = res.data.global_per_spot;
      let mostResult = Object.keys(this.mostOccupiedData).map((key) => [key, this.mostOccupiedData[key]]);
      this.mostOccupiedResult = mostResult.filter(element => element[1].avg_occupancy == Math.max(...mostResult.map(o => o[1].avg_occupancy)));
      this.leastOccupiedResult = mostResult.filter(element => element[1].avg_occupancy == Math.min(...mostResult.map(o => o[1].avg_occupancy)));
      let sub_mostOccupiedResult = this.mostOccupiedResult[0][0];
      let sub_leastOccupiedResult = this.leastOccupiedResult[0][0];

      this.mostOccupiedResult = sub_mostOccupiedResult.split("/")[1];
      this.leastOccupiedResult = sub_leastOccupiedResult.split("/")[1];

      data.forEach(element => {
        let occupancyData = [];
        // commented forinout graph -- satyam
        // let total_inflow = [];
        // let total_outflow = [];
        occupancyData.push(element.timestamp * 1000);
        occupancyData.push(parseInt(element.avg_occupancy));
        this.occupancyVariationData.push(occupancyData);

        // total_inflow.push(element.timestamp*1000);
        // total_inflow.push(element.total_inflow);
        // this.totalInFlowData.push(total_inflow);

        // total_outflow.push(element.timestamp*1000);
        // total_outflow.push(element.total_outflow);
        // this.totalOutFlowData.push(total_outflow);

      });
      this.loadChartDataOccupancy(this.occupancyVariationData);
      // this.loadInTimeOutTimeChart(this.totalInFlowData,this.totalOutFlowData);
      this.dataWeekly.sort(function (a, b) { return a.avg_occupancy - b.avg_occupancy });
      // data.sort((a,b) => a.avg_occupancy.localeCompare(b.avg_occupancy));
    });
  }
  // inout function -- satyam
  async getInoutGraphData() {
    await this._dashBoardService.getInoutGraphData({ companyLocationName: this.locationsData[this.selectedBuilding].name }).subscribe(res => {
      // console.log(res);
      let data = res.data;
      this.dataWeeklyForInout = res.data;
      data.forEach(element => {
        let total_inflow = [];
        let total_outflow = [];
        total_inflow.push(element.timeStamp);
        total_inflow.push(element.inCount);
        this.totalInFlowData.push(total_inflow);
        total_outflow.push(element.timeStamp);
        total_outflow.push(element.outCount);
        this.totalOutFlowData.push(total_outflow);
      });
      this.loadInTimeOutTimeChart(this.totalInFlowData, this.totalOutFlowData);
    });
  }

  getPrevious7days() {
    let date = new Date();
    date.setDate(date.getDate() - 7) // subtract 7 days
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    this.previous7Days = Math.floor(new Date(date).getTime() / 1000);
  }

  // paginator?: any,
  async getManualEntries(isLoad:Boolean) {
   
    // console.log(new Date(new Date().setHours(0, 0, 0, 0)).getTime());
    let response = [];

    let data = {
      ...this.validPageOptions,
      // requestedPage: "manual",
      compLocationName: this.locationsData[this.selectedBuilding].name,
      fromDate: new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    };

    await this._dashBoardService.getManualEntryList(data,isLoad).subscribe(res => {

      // let _res = res.data.entryLogList;

      // _res.forEach(element => {
      //   if(element.companyLocationName == this.locationsData[this.selectedBuilding].name) {
      //      response.push(element);
      //   }
      // });
      // console.log(res);
      this.datas.data = res.data.entryLogList;
      this.total = res.data.totalCount;

    });

  }

  loadChartDataOccupancy(result) {
    let i = 0;

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
        color: "#87CEEB"

      }]
    });

    this.occupancyChart = occupancyChart;
    occupancyChart.ref$.subscribe(console.log);
  }

  loadInTimeOutTimeChart(inFlow, outFlow) {
    let i = 0;

    let inOutChart = new Chart({
      chart: {
        zoomType: 'x',
        type: 'column',
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        crosshair: true
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          }
        },
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      yAxis: [{ //--- Primary yAxis
        title: {
          text: 'Count'
        },
        // labels: {
        //   formatter: function () {
        //     return this.value + '%';
        //   }
        // },
      }],



      series: <any>[{
        name: 'Inflow',
        // type: 'area',
        data: inFlow,
        color: "#92CD28",
      }, {
        name: 'Outflow',
        // type: 'area',
        data: outFlow,
        color: "#FF4500"
      }
      ]
    });

    this.inOutChart = inOutChart;
    inOutChart.ref$.subscribe(console.log);
  }

  async downloadOccupancyData() {
    let response = await this.openDialog({ message: "test" }).toPromise();
    // console.log(response.validFrom.getTime('X'));
    // console.log(this.previous7Days);
    // console.log(this.currentTimestamp);
    // response = this.changeDateFormat(response);
    // console.log(response);
    // console.log(response);
    if (!response) {
      return
    }
    if (response.validFrom == "" || response.validTill == "") {
      this._utilityService.errorAlert({ error: { message: "Please select both from date and to date" } })
      return
    }
    let data = {
      user: this.user,
      password: this.user_password,
      buildingUrl: this.buildingUrl,
      cameras: this.cameras,
      range_from: 18000 + 1800 + response.validFrom.getTime() / 1000,
      range_to: 86400 + response.validTill.getTime() / 1000 + 18000 + 1800
    }
    // console.log(data);
    await this._dashBoardService.getOccupancyVariation(data).subscribe(res => {
      this.occupancyVariationData = [];
      this.totalInFlowData = [];
      this.totalOutFlowData = [];
      let data = res.data.list_all.aggregations;
      data.map(function (item) {
        item.date = moment(item.timestamp * 1000).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        delete item.timestamp;
        item.occupancy = item.avg_occupancy;
        delete item.avg_occupancy;
        delete item.median_duration;
        delete item.total_inflow;
        delete item.total_outflow;
        return item;
      });
      this.excelService.exportAsExcelFile(data, 'OccupancyData');
    });

  }
  // function changed according to data -- satyam
  async downloadInflowOutflowData() {
    let response = await this.openDialog({ message: "test" }).toPromise();
    // console.log(response.validFrom.getTime('X'));
    // console.log(this.previous7Days);
    // console.log(this.currentTimestamp);
    // response = this.changeDateFormat(response);
    // console.log(response);
    // console.log(response);
    if (!response) {
      return
    }
    if (response.validFrom == "" || response.validTill == "") {
      this._utilityService.errorAlert({ error: { message: "Please select both from date and to date" } })
      return
    }
    let data = {
      companyLocationName: this.locationsData[this.selectedBuilding].name,
      fromDate: response.validFrom.getTime(),
      toDate: response.validTill.getTime()
    }
    // console.log(data);
    await this._dashBoardService.getInoutGraphData(data).subscribe(res => {
      // console.log(res);
      let data = res.data;
      data.map(function (item) {
        item.date = moment(item.timeStamp).subtract(5, "hours").subtract(30, "minutes").format("MM/DD/YYYY HH:mm:ss");
        delete item.timeStamp;
        delete item.avg_occupancy;
        delete item.median_duration;
        item['In count'] = item.inCount;
        delete item.inCount;
        item['Out count'] = item.outCount;
        delete item.outCount;
        return item;
      });
      this.excelService.exportAsExcelFile(data, 'InflowOutFlowData');
    });

  }
  openDialog(data) {
    const dialogRef = this.dialog.open(DateRangeModalComponent, {
      width: '500px',
      data: data,
    });
    return dialogRef.afterClosed();
    ` `
  }
  loadProgressBarChart(floorName, occupiedPercentage, occupiedSpots, totalSpots) {
    var chart = new Chart({
      title: {
        text: floorName,
        align: 'left',
        margin: 10,
      },
      chart: {
        type: 'bar',
        height: 100,
      },
      tooltip: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
        min: 0,
        max: 100,
      },
      series: <any>[{
        data: [100],
        grouping: false,
        animation: false,
        enableMouseTracking: false,
        showInLegend: false,
        color: '#87bc24',
        pointWidth: 25,
        borderWidth: 0,
        borderRadiusTopLeft: '4px',
        borderRadiusTopRight: '4px',
        borderRadiusBottomLeft: '4px',
        borderRadiusBottomRight: '4px',
        dataLabels: {
          className: 'highlight',
          format: `${occupiedSpots} / ${totalSpots}`,
          enabled: true,
          align: 'right',
          style: {
            color: 'white',
            textOutline: false,
          }
        }
      }, {
        enableMouseTracking: false,
        data: [occupiedPercentage],
        borderRadiusBottomLeft: '4px',
        borderRadiusBottomRight: '4px',
        color: "#FF0000",
        borderWidth: 0,
        pointWidth: 25,
        animation: {
          duration: 250,
        },
        dataLabels: {
          enabled: true,
          inside: true,
          align: 'left',
          format: '{point.y}%',
          style: {
            color: 'white',
            textOutline: false,
          }
        }
      }]
    });
    this.progressChart.push(chart);
    chart.ref$.subscribe(console.log);
  }

  ngOnDestroy() {
    clearInterval(this.snapShot_interval);
    if (this.real_time_entries) {
      clearInterval(this.real_time_entries);
    }
  }
  // timerFunction(){
  //   setInterval(async ()=> {
  //     this.getFloors();
  //     // console.log("test");
  //   }, 10000);
  // }
  
  
}
