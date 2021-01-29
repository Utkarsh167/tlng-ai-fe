import { Pipe, PipeTransform } from '@angular/core';
import { getFileType } from '../../constant/app-constant'

@Pipe({
  name: 'fileType'
})
export class FileTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const extension = getFileType(value);
      switch (extension) {
        case 'jpeg':
          return value;
        case 'jpg':
          return value;
        case 'png':
          return value;
        case 'pdf':
          return 'assets/images/pdf.png';
        default:
          return 'assets/images/ic_car_graphic.jpg';
      }
    } else {
      return 'assets/images/ic_car_graphic.jpg';
    }
  }

}
