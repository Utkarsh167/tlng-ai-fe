import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '../../../../../models/pagination';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RealTimeService } from '../service/realtime.service';
import { DURATION, FLOORS, STATUS, VIEW, NOTIFICATION_AUDIENCE, SENDNOW } from '../../../../../constant/app-constant'
import { duration } from 'moment';
import { MapviewComponent } from '../dialog/mapview/mapview.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { even } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { POPUP_MESSAGES, PARKED_LONG } from 'src/app/constant/messages'
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { element } from 'protractor';
import { DataExchange } from 'aws-sdk/clients/all';
import { SecondsToHoursPipe } from 'src/app/pipes/seconds-to-hours/seconds-to-hours.pipe';

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'noComma'
// })

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
  providers: [SecondsToHoursPipe]
})
export class RealtimeComponent extends Pagination implements OnInit{

  datas = new MatTableDataSource<Snapshot.Detail>([]);
  // @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  // 'zone' after camera   then enteredAt and exitedAt after event_start
  displayedColumns = ['position', 'name', 'camera', 'slotNo', 'vehicleId', 'duration','event_start', 'image', 'status', 'action'];
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
  imageSize: any;
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
  longHoursCount: any;
  totalSpots = 0;
  snapShot_interval;
  isLoadCamera = true;

//   textArray = [
//     'KA',
//     'UP',
//     'GJ',
//     'TS',
//     'CG',
//     'DL'
// ];

// randomNumber = Math.floor(Math.random()*this.textArray.length);
  // onLoad: boolean;

  nameArray = ['Gert',
  'Gordon',
  'Humberto',
  'Hanna',
  'Henri',
  'Hermine',
  'Harvey',
  'Helene',
  'Iris',
  'Isidore',
  'Isabel',
  'Ivan',
  'Irene',
  'Isaac',
  'Jerry',
  'Josephine',
  'Juan',
  'Jeanne',
  'Jose',
  'Joyce',
  'Karen',
  'Kyle',
  'Kate',
  'Karl',
  'Katrina',
  'Kirk',
  'Lorenzo',
  'Lili',
  'Larry',
  'Lisa',
  'Lee',
  'Leslie',
  'Michelle',
  'Marco',
  'Mindy',
  'Maria',
  'Michael',
  'Noel',
  'Nana',
  'Nicholas',
  'Nicole',
  'Nate',
  'Nadine',
  'Olga',
  'Omar',
  'Odette',
  'Otto',
  'Ophelia',
  'Oscar',
  'Pablo',
  'Paloma',
  'Peter',
  'Paula',
  'Philippe',
  'Patty',
  'Rebekah',
  'Rene',
  'Rose',
  'Richard',
  'Rita',
  'Rafael',
  'Sebastien',
  'Sally',
  'Sam',
  'Shary',
  'Stan',
  'Sandy',
  'Tanya',
  'Teddy',
  'Teresa',
  'Tomas',
  'Tammy',
  'Tony',
  'Van',
  'Vicky',
  'Victor',
  'Virginie',
  'Vince',
  'Valerie',
  'Wendy',
  'Wilfred',
  'Wanda',
  'Walter',
  'Wilma',
  'William',
  'Kumiko',
  'Aki',
  'Miharu',
  'Chiaki',
  'Michiyo',
  'Itoe',
  'Nanaho',
  'Reina',
  'Emi',
  'Yumi',
  'Ayumi',
  'Kaori',
  'Sayuri',
  'Rie',
  'Miyuki',
  'Hitomi',
  'Naoko',
  'Miwa',]
  constructor(private _realTimeService: RealTimeService, private dialog: MatDialog, 
    private _utilityService: UtilityService,
    private secondsToHourPipe: SecondsToHoursPipe) {
    super();
    // this.createSelectForm();
  }

  ngOnInit() {
    // this.onLoad = true;
    this.sliderDisabled = true;
    this.toggleNav = true; //change it to false to hide table on load
    this.withImage = false;
    this.getCurrentTimeStamp();
    setInterval(() => {
      this.getCurrentTimeStamp();
      }, 10000);
    this.getPrevious24Hours();
    this.getLocations();
    this.getLongDuration();
    // this.selectedZone = "All";
    // this.downloadVideo();
  }

  /*
      Method For Sorting
  */

  sortData(event) {
    this.sortOptions = event;
    this.resetPages();
    this.getSnapshotData();
  }

  /*
    Method For Changing The Pagination
  */

  createSelectForm() {
    this.selectForm = this._realTimeService.createSelectForm();
  }

  changePage(event: MatPaginator) {
    this.pageOptionsOnChange = event;
    if (this.total == 0) {
      return;
    }
    this.getSnapshotData(event);
  }

  async getScopeData(camera?: any) {
    // let firstCol = document.getElementById("firstCol");
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.add('image_overflow');

    if (this.mainScopeData != undefined) {
      

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
      console.log(this.params);
      console.log(this.mainScopeData.data);
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
          this.getSnapshotData(undefined, undefined, undefined);
        } else if (this.selectedView == 1) {
          //console.log(2);

          this.withImage = true;
          this.params.withImage = false;
          this.params.cameras = [this.cameras[0]];
          this.scopeMapData = this.cameraScopeData;
          this.snapShotData = undefined;
          this.getSnapshotData(undefined, undefined, this.cameras[0]);
          // console.log(this.scopeMapData);
          // console.log(this.cameraImageSize);
          // console.log(this.IMAGE_SRC);
        } else {
          // console.log(3);

          this.params.withImage = false;
          this.params.cameras = this.cameras;
          this.scopeMapData = this.scopeMapData;
          this.snapShotData = undefined;
          this.getSnapshotData(undefined, undefined, undefined);
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
        this.getSnapshotData(undefined, undefined, undefined);
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
        this.getSnapshotData(undefined, undefined, undefined);
      }

      // console.log(this.selectedView);
      if (this.selectedView == 1) {
        // console.log(11111);
      }
    } else {
      await this._realTimeService.getScopeData(this.params).subscribe(res => {
        this.scopeMapData = [];
        this.imageSize = [];
        this.cameras = [];
        this.mainScopeData = res;
        console.log(this.params);
        console.log(res.data);
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
            this.getSnapshotData(undefined, undefined, undefined);
          } else if (this.selectedView == VIEW[1].value) {
            this.withImage = true;
            this.params.withImage = false;
            this.params.cameras = this.cameras;
            this.scopeMapData = this.cameraScopeData;
            this.snapShotData = undefined;
            this.getSnapshotData(undefined, undefined, undefined);
          } else {
            this.params.withImage = false;
            this.params.cameras = this.cameras;
            this.scopeMapData = this.scopeMapData;
            this.snapShotData = undefined;
            this.getSnapshotData(undefined, undefined, undefined);
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
          this.getSnapshotData(undefined, undefined, undefined);
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
          this.getSnapshotData(undefined, undefined, undefined);
        }

        // console.log(this.selectedView);

      });
    }
    // this.snapShot_interval = setInterval(async ()=> {
    //   this.getSnapshotData(undefined, undefined, undefined, undefined, false);
    //   console.log("test");
    //   // console.log("test");
    // }, 5000);


  }

  async getSnapshotData(paginator?: any, timeRange?: any, camera?: any, isSlider?: any, isLoad = true) {
    // this.paginator.pageIndex = 0;
    // console.log(paginator);
    let data = [];
    if (this.snapShotData == undefined) {
      console.log("here");
      this.tempScopeMapData = this.scopeMapData;
      if (this.selectedView == 1) {
        this.params.withImage = true;
      }
      this.params.timestamp = this.currentTimestamp;
      // console.log(this.params)
      await this._realTimeService.getSnapshotData(this.params, isLoad).subscribe(res => {
        // console.log(res);
        this.snapShotData = res.data.spot_states;
        this.MedianDuration = res.data.median_duration;
        this.tempSnapShotData = this.snapShotData;
        this.VacantData = res.data.spot_states.length - res.data["occupiers"];
        this.OccupiedData = res.data["occupiers"];
        this.overallData.occupied = this.OccupiedData;
        this.overallData.available = this.VacantData;
        this.cameraImage = "data:image/png;base64," + res.data.image;

        let longHoursCount = 0;
        this.snapShotData.forEach(element => {
          if(element.duration>this.longHours){
            longHoursCount++;
          }
        });
        this.longHoursCount =  longHoursCount;
        console.log('longhours count ->>>>'+longHoursCount)

        // console.log(this.cameraImage);
        if (camera) {
          this.IMAGE_SRC = this.cameraImage;
        }
        // Pagination

        if (paginator != undefined) {
          let StartPageIndex = paginator.pageIndex * paginator.pageSize;
          let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
          this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
            data.push(item);
          });
        } else {
          this.snapShotData.slice([0], [10]).map((item, i) => {
            data.push(item);
          });
          this.page = 1;
        }
        this.sliderDisabled = false;


        this.total = this.snapShotData.length;
        this.totalSpots = this.snapShotData.length;
        this.datas.data = data;

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

        if (camera != undefined) {

          let formattedSnapshotData = [];
          let formattedData = [];
          formattedSnapshotData = this.snapShotData.filter(element => element.camera_id == camera);
          formattedSnapshotData.slice(0, 10).map((item, i) => {
            formattedData.push(item);
          });
          this.page = 1;
          this.total = formattedSnapshotData.length;
          this.datas.data = formattedData;
        }
        this.scopeMapData = [];
        // console.log(this.tempScopeMapData);
        if (this.selectedView == 1) {
          this.tempScopeMapData = this.objectKeys(this.mainScopeData.data.cameras[this.params.cameras[0]].spots);
          this.snapShotData.forEach(element => {
            this.tempScopeMapData.forEach(inner_element => {
              if (inner_element.external_id == element.spot_id) {
                this.scopeMapData.push(inner_element);
              }
            });
          });
          this.imageSize = this.cameraImageSize;
          this.withImage = true;
        } else {
          this.snapShotData.forEach(element => {
            this.tempScopeMapData.forEach(inner_element => {
              if (inner_element.spot_id == element.spot_id && inner_element.camera_id == element.camera_id) {
                this.scopeMapData.push(inner_element);
              }
            });
          });
          this.imageSize = this.imageSize;
          this.withImage = false;
        }
        if (!isLoad){
          this.viewChange(this.selectedView);
        }


        console.log(this.scopeMapData)
        console.log(this.snapShotData)


      });


    } else {

      if (timeRange != undefined) {
        this.params.timestamp = timeRange;
        console.log("thenhere");
        console.log(this.cameras);
        if (isSlider) {
          this.params.cameras = this.cameras;
          this.params.withImage = false;
        }
        console.log(this.params);
        await this._realTimeService.getSnapshotData(this.params, isLoad).subscribe(res => {
          this.snapShotData = res.data.spot_states;
          this.tempSnapShotData = this.snapShotData;
          this.MedianDuration = res.data.median_duration;
          this.VacantData = res.data.spot_states.length - res.data["occupiers"];
          this.OccupiedData = res.data["occupiers"];

          if (this.status_selected != "all") {
            let data = this.snapShotData.filter(element => element.occupied == eval(this.status_selected));

            data.forEach(elementSnapShotData => {
              this.durationColors.forEach((elementDurationColors) => {
                if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
                  elementSnapShotData.color = elementDurationColors.color;
                } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
                  elementSnapShotData.color = elementDurationColors.color;
                }
              });
            });
            this.snapShotData = data;
            this.total = this.snapShotData.length;
            this.datas.data = data;
          } else {
            this.snapShotData.forEach(elementSnapShotData => {
              this.durationColors.forEach((elementDurationColors) => {
                if (!elementSnapShotData.occupied && elementDurationColors.end === 0) {
                  elementSnapShotData.color = elementDurationColors.color;
                } else if (elementSnapShotData.occupied && elementSnapShotData.duration >= elementDurationColors.start && elementSnapShotData.duration <= elementDurationColors.end) {
                  elementSnapShotData.color = elementDurationColors.color;
                }
              });
            });
          }


          // Pagination
          if (paginator != undefined) {

            let StartPageIndex = paginator.pageIndex * paginator.pageSize;
            let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
            this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
              data.push(item);
            });
          } else {
            this.snapShotData.slice([0], [10]).map((item, i) => {
              data.push(item);
            });
            this.page = 1;
          }
          this.total = this.snapShotData.length;
          this.datas.data = data;
          if (isSlider) {
            console.log("there");
            console.log(this.snapShotData);
            this.scopeMapData = this.tempScopeMapData;
            console.log(this.scopeMapData);

          }
        });
      } else {

        // Pagination
        if (paginator != undefined) {
          let StartPageIndex = paginator.pageIndex * paginator.pageSize;
          let endPageIndex = (paginator.pageIndex + 1) * paginator.pageSize;
          this.snapShotData.slice([StartPageIndex], [endPageIndex]).map((item, i) => {
            data.push(item);
          });
        } else {
          this.snapShotData.slice([0], [10]).map((item, i) => {
            data.push(item);
          });
          this.page = 1;
        }
        // console.log(this.snapShotData)
        this.total = this.snapShotData.length;
        this.datas.data = data;
      }
      if (!isLoad){
        this.isLoadCamera = false;
        this.viewChange(this.selectedView);
      }



      // get colors based on duration


    }
    // console.log(this.scopeMapData);
    // console.log(this.snapShotData);

  }

  // async getVacantData(timestamp?: any) {
  //   if(timestamp != undefined) {
  //     this.params.timestamp = timestamp;
  //   } else {
  //     this.params.timestamp = this.currentTimestamp;
  //   }
  //   await this._realTimeService.getVacantData(this.params).subscribe(res => {
  //     this.VacantData = res.data;
  //   });
  // }

  // async getOccupiedData(timestamp?: any) {
  //   if(timestamp != undefined) {
  //     this.params.timestamp = timestamp;
  //   } else {
  //     this.params.timestamp = this.currentTimestamp;
  //   }
  //   await this._realTimeService.getOccupiedData(this.params).subscribe(res => {
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
    // setInterval(() => {
      let date = new Date();
      date.setHours(date.getHours()); // subtract 5 hours to match parquery server timezone
      date.setMinutes(date.getMinutes()); // subtract 30 minutes to match parquery server timezone
      this.currentTimestamp = Math.floor(new Date(date).getTime() / 1000);
      if(!this.selectedTime){
      this.selectedTime = this.currentTimestamp;
      }
      if(!this.sliderValue){
      this.sliderValue = this.currentTimestamp; 
      }
      // }, 5000);
  }


  async durationFilter(value: any) {
    let event = {value: value};
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
    let event = {value: value};
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
        //undefined -> 1000
      this.disableZone = false;
      this.selectedZone = "1000";
    } else {
        //undefined -> 1000
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
    console.log(this.snapShotData);
    console.log(this.scopeMapData);
    this.getSnapshotData(undefined, event.value, undefined, true);
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

    await this._realTimeService.getLocations().subscribe(res => {
      this.locationsData = res.data["locations"];
      console.log(this.locationsData);
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
      //   //undefined -> 1000
      //   this.disableZone = true;
      //   this.selectedZone = "1000";
      // } else {
      //   //undefined -> 1000
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
    let event = {value: value};
    this.scopeMapData = [];
    this.status_selected = 'all';
    this.duration_selected = '0';
    let cameraView = document.getElementById("cameras");
    let duration = document.getElementById("duration");
    duration.style.display = "none";
    cameraView.style.display = "none";
    // let index = this.locationsData.findIndex(item => item === event.value);
    this.floorsData = this.locationsData[event.value]["floors"];
    this.user = this.locationsData[event.value].user;
    this.user_password = this.locationsData[event.value].password;
    this.buildingUrl = this.locationsData[event.value].parqueryValue;
    this.withImage = false;
    this.getLocations(event.value);
  }

  getMapData(value: any) {
    let event = {value: value};
    this.status_selected = 'all';
    this.duration_selected = '0';
    let duration = document.getElementById("duration");
    duration.style.display = "none";
    this.IMAGE_SRC = this.floorsData[event.value].parqueryValue;
    this.tempImageSrc = this.IMAGE_SRC;
    // this.view = [];
    // this.selectedView = VIEW[0].value;
    // this.selectedView = undefined;
    let cameraView = document.getElementById("cameras");
    cameraView.style.display = "none";
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
    console.log(this.params);
    this.params = obj;
    this.getScopeData();
    // this.getVacantData();
    // this.getOccupiedData();
  }

  getZonesData(value: any) {
    // console.log(this.selectedZone);
    let event = {value: value};
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
    let event = {value: value};
    console.log(event);
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
      console.log(this.mainScopeData.data);
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
      this.getSnapshotCameraImage(this.isLoadCamera);
    }
    //  await this.getScopeData();
  }

  async cameraChange(value: any) {
    let event = {value: value};
    if (this.selectedView == 1) {
      this.imageSize = this.cameraImageSize;
      this.scopeMapData = this.cameraScopeData;
      this.withImage = true;
      this.scopeMapData = [];
      this.params.withImage = true;
      this.params.cameras = [this.cameras[event.value]];
      this.getSnapshotCameraImage(true);
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

  async getSnapshotCameraImage(isLoad) {
    // console.log(this.params)
    await this._realTimeService.getSnapshotData(this.params, isLoad).subscribe(res => {
      this.isLoadCamera = true;
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
      // console.log(this.scopeMapData);
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
        console.log(this.scopeMapData);
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
      console.log(this.scopeMapData)
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

    await this._realTimeService.downloadVideo(formData).subscribe(res =>
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

        this._realTimeService.sendUserNotification(data).subscribe(res => {
          console.log(res);
          this._utilityService.showAlert(res.message);
        });
      }

    });
  }

  getLongDuration() {
    this._realTimeService.getLongDuration().subscribe(res => {
      this.longHours = res.data.companyData.config.duration;
      this.longHours = this.longHours * 60 * 60;
      // console.log(this.longHours);
    });
  }

  // transform(val: number): string {
  //   if (val !== undefined && val !== null) {
  //     // here we just remove the commas from value
  //     return val.toString().replace(/,/g, "");
  //   } else {
  //     return "";
  //   }
  // }

  openImageModal(imagelink,element){

    console.log(element.duration);
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    // var img = document.getElementById("myImg");
    var modalImg:any; 
    modalImg= document.getElementById("img01");
    var captionText = document.getElementById("caption");
    // img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = 'data:image/png;base64,'+imagelink;
      captionText.innerHTML = !element.duration ? ('Spot - '+element.spot_id):('Spot - '+element.spot_id+'('+this.secondsToHourPipe.transform(element.duration)+')');
    // }
    
    // Get the <span> element that closes the modal
    var span;
    span = document.getElementsByClassName("modal")[0];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
    }
   }
}
