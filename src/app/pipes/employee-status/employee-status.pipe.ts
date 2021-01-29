import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "employeeStatus"
})
export class EmployeeStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let status;
    if (value == 0) {
      status = "Scheduled";
    } 
    // @Utkarsh 19/march removed same status check for ongoing and no show
    // else if (value == 1 || value == 5) {
      else if (value == 1) {   
    status = "Onboarded";
    } else if (value == 2) {
      status = "Cancelled";
    } else if (value == 3) {
      status = "Rescheduled";
    } else if (value == 4) {
      status = "No show";
    } else if (value == 5) {
      status = "Ride started";
    } else if (value == 6) {
      status = "Completed";
    } else if (value == 7) {
      status = "Driver Reached";
    } else if (value == 8) {
      status = "Employee Self Offboard";
    }
    return status;
  }
}
