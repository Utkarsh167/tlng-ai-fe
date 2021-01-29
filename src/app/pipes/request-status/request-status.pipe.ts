import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {

  transform(value: any): any {
    let status;
    if (value === 0) {
      status = "Pending";
    }
    else if (value === 1) {
      status = "Resolved";
    }
    else if (value === 2) {
      status = "Cancelled";
    }
    else if (value === 3) {
      status = "Marksafe";
    }
    else if (value === 4) {
      status = "Pending";
    }
    else if (value === 5) {
      status = "Rejected";
    }

    return status;
  }
}
