import { Pipe, PipeTransform } from '@angular/core';
import * as routes from '../../constant/absolute-routes';

@Pipe({
  name: 'absolutePath'
})
export class AbsoluteRoutingPipe implements PipeTransform {

  transform(route) {
    return routes[route];
  } 
}
 