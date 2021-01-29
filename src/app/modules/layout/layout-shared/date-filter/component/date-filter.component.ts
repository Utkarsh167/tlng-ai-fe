import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

interface IDate {
  label: string,
  fromDate: FormControl,
  toDate: FormControl
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {

  minDate: Date;
  maxDate = new Date();
  @Input() dateObject: IDate;
  minDateSubscriber: Subscription;
  constructor() { }

  ngOnInit() {
    this.minDateSubscriber = this.dateObject.fromDate.valueChanges.subscribe(
      data => {
        if(!data) {
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
    this.dateObject.toDate.setValue('');
  }

  setToDate() {
    if (this.dateObject.toDate.value) {
      let to = new Date(this.dateObject.toDate.value);
      to.setHours(23);
      to.setMinutes(59);
      to.setSeconds(59);
      this.dateObject.toDate.setValue(to)
    }
  }

  ngOnDestroy() {
    this.minDateSubscriber.unsubscribe();
  }
}