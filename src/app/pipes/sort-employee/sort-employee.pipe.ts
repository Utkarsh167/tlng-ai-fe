import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'sortEmployee'
})
export class SortEmployeePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let sortData = _.sortBy(value, 'empOrder');
      return sortData;
    }
  }
}
