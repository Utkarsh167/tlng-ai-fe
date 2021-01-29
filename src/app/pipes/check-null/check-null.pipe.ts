import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkNull'
})
export class CheckNullPipe implements PipeTransform {
    constructor() {
    }
  transform(value: any, args?: any): any {
    return (value!==undefined&&value!==null)?value:'-'
  }

}