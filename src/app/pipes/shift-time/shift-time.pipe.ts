import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment-timezone";

@Pipe({
  name: 'shiftTime'
})
export class ShiftTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return moment(value, 'HH:mm:ss').tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('hh:mm A')
    // return 24 hrs format - Shivakumar A
    return moment(value, 'HH:mm:ss').tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('HH:mm')

  }

}
