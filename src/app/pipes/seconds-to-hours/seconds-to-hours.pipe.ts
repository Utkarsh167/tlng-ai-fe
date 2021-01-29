import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours'
})
export class SecondsToHoursPipe implements PipeTransform {

  transform(value: number): string {
    let d = Number(value);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h >= 10 ? "" : "0") + h  : "";
    var mDisplay = m > 0 ? (m >=10 ? "" : "0") + m : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    if(h < 1) {
      return "00" +'h '+ mDisplay + 'm';
    } else {
      return hDisplay +'h '+ mDisplay +'m';
    }
  }

}
