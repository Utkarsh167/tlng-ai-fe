import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

interface IDate {
  label: string,
  scheduleFromDate: FormControl,
  scheduleToDate: FormControl
}

@Component({
  selector: 'app-schedule-date-filter',
  templateUrl: './schedule-date-filter.component.html',
  styleUrls: ['./schedule-date-filter.component.scss']
})
export class ScheduleDateFilterComponent implements OnInit {

  minDate: Date;
  maxDate = new Date();
  @Input() dateObject: IDate;
  minDateSubscriber: Subscription;
  constructor() { }

  ngOnInit() {
    this.minDateSubscriber = this.dateObject.scheduleFromDate.valueChanges.subscribe(
      data => {
        if (!data) {
          this.minDate = null;
        }
      }
    )
  }

  /*
    Method For Detecting Filter From Date Change
  */
  dateChange(event: MatDatepickerInputEvent<Date>) {
    let dateValue = event.value;
    let minFromDate = new Date(dateValue);
    this.minDate = new Date(minFromDate.getFullYear(), minFromDate.getMonth(), minFromDate.getDate());
    this.dateObject.scheduleToDate.setValue('');
  }

  setToDate() {
    if (this.dateObject.scheduleToDate.value) {
      let to = new Date(this.dateObject.scheduleToDate.value);
      to.setHours(23);
      to.setMinutes(59);
      to.setSeconds(59);
      this.dateObject.scheduleToDate.setValue(to)
    }
  }

  ngOnDestroy() {
    this.minDateSubscriber.unsubscribe();
  }
}
