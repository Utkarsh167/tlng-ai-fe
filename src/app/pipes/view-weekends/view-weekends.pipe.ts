import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewWeekends'
})
export class ViewWeekendsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let day;
    if (value == 1) {
      day = 'monday'
    }
    else if (value == 2) {
      day = 'tuesday'
    }
    else if (value == 3) {
      day = 'wednesday'
    }
    else if (value == 4) {
      day = 'thursday'
    }
    else if (value == 5) {
      day = 'friday'
    }
    else if (value == 6) {
      day = 'saturday'
    }
    else if (value == 0) {
      day = 'sunday'
    }
    return day;
  }

}
