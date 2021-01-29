import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customName'
})
export class CustomNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      var string;
      var stringArray = new Array();
      string = value.split(" ");
      for (var i = 0; i < string.length; i++) {
        stringArray.push(string[i].charAt(0));
      }

    }
    if (stringArray.length > 1) {
      return `${stringArray[0]} ${stringArray[1]}`;
    }
    else {
      return stringArray[0]
    }
  }

}
