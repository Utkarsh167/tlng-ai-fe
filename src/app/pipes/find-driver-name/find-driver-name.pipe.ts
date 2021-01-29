import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import { RIDE_STATUS } from 'src/app/constant/app-constant'

@Pipe({
  name: 'findDriverName'
})
export class FindDriverNamePipe implements PipeTransform {
  constructor() {
  }

  transform(value: any, args?: any): any {
    let driverData;
    if (!args && value && value.length) {
      driverData = this.findDriverInfo(value, 1);
    }
    else if (args && args === "startLocation" && value && value.length) {
      driverData = this.findDriverInfo(value, 2);
    }
    else if (args && args === "dropLocation" && value && value.length) {
      driverData = this.findDriverInfo(value, 3);
    }
    else if (args && args === "startTime" && value) {
      driverData = this.findDriverInfo(value, 4);
    }
    else if (args && args === "endTime" && value) {
      driverData = this.findDriverInfo(value, 5);
    }
    else if (args && args === "status") {
      driverData = this.findDriverInfo(value, 6);
    }
    else if (args && args === "tripType" && value) {
      driverData = this.findDriverInfo(value, 7);
    }
    else if (args && args === "pickTime" && value) {
      driverData = this.findDriverInfo(value, 8);
    }
    return driverData
  }
  

  findDriverInfo(value, type) {
    let driverInfo;
    if (type === 1) {
      value.map(x => {
        if (x.onlineStatus) {
          driverInfo = x.name;
        }
      })
    }
    else if (type === 2) {
      value.map(x => {
        if (x.onlineStatus) {
          driverInfo = x.companyLocation.address;
        }
      })
    }
    else if (type === 3) {
      value.map(x => {
        if (x.onlineStatus) {
          driverInfo = x.companyLocation.address;
        }
      })
    }
    else if (type === 4) {
      let temp = moment.unix(value.startShift);
      driverInfo = temp;
    }
    else if (type === 5) {
      let temp = moment.unix(value.endShift);
      driverInfo = temp;
    }
    else if (type === 6) {
      if (value) {
        driverInfo = "Ongoing";
      }
      else {
        driverInfo = "Completed";
      }
    }
    else if (type === 7) {
      if (value == RIDE_STATUS.HOME_TO_OFFICE) {
        driverInfo = "Home to Office";
      }
      else if (value == RIDE_STATUS.OFFICE_TO_HOME) {
        driverInfo = "Office to Home";
      }
    }

    else if (type === 8) {
      if (value) {
        driverInfo = moment.unix(value);
      }
    }
    return driverInfo
  }
} 
