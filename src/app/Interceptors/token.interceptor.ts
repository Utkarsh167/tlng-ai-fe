import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { UtilityService } from '../modules/shared/services/utility.service';
import { LoaderService } from '../modules/shared/services/loader.service';
import { LOGIN } from '../constant/absolute-routes';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _utilityService: UtilityService,
    private _loaderService: LoaderService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {}
    headers['platform'] = "3";
    headers['authorization'] = 'Basic dHJhbnNsYWI6cGFya0A5MjEx';
  
    const token = this._utilityService.getAuthToken();
    if (token) {
      headers['authorization'] = 'Bearer ' + token;
      headers['api_key'] = '1234';
    }

    if (request.url.indexOf('blob.core.windows') != -1) {
      headers = {};
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap(
        (data) => {
          if (data instanceof HttpResponse) {
            if (data.url.indexOf('blob.core.windows') == -1) {
              this._loaderService.loader.next(false);
            }
          }
        },
        (err: any) => {
          this._loaderService.loader.next(false);
          if (err instanceof HttpErrorResponse) {
            this._utilityService.errorAlert(err);
            if (err.status === 401 || err.error.responseType == 'UNAUTHORIZED') {
              this._utilityService.clearStorage();
              this.router.navigate([LOGIN]);
            }
          }
        }
      ));
  }
}