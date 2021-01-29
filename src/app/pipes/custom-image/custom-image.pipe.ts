import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'customImage'
})
export class CustomImagePipe implements PipeTransform {
  constructor(private cd: ChangeDetectorRef) {

  }
  transform(src: string, args?: string) {
    const img = new Image();
    img.src = src;
    return new Observable((observer) => {
      observer.next(args || 'assets/images/ic_car_graphic.jpg');
      if (src) {
        img.onload = () => {
          observer.next(img.src);
          this.cd.detectChanges();
        };
      }
    });
  }

}
