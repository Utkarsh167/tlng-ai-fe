import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoaderService } from './loader.service';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private _loaderService: LoaderService
    ) {
        this.apiUrl = environment.url;
    }


    post<T>(url, data, loader = true): Observable<Common.ApiResponse<T>> {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        return this.http.post<Common.ApiResponse<T>>(this.apiUrl + url, data);
    }

    put<T>(url, data, loader = true): Observable<Common.ApiResponse<T>> {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        return this.http.put<Common.ApiResponse<T>>(this.apiUrl + url, data);
    }

    patch<T>(url, data, loader = true): Observable<Common.ApiResponse<T>> {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        return this.http.patch<Common.ApiResponse<T>>(this.apiUrl + url, data);
    }

    get<T>(url, httpParams?: any, loader = true): Observable<Common.ApiResponse<T>> {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        for (let item in httpParams) {
            if (httpParams[item] === '' || httpParams[item] === undefined || httpParams[item] === null) {
                delete httpParams[item];
            }
        }
        const header = {};
        if (httpParams) {
            header['params'] = httpParams;
        }
        return this.http.get<Common.ApiResponse<T>>(this.apiUrl + url, header);
    }

    delete(url, httpParams?, loader = true) {
        if (loader) {
            this._loaderService.loader.next(loader);
        }
        for (let item in httpParams) {
            if (httpParams[item] === '' || httpParams[item] === undefined || httpParams[item] === null || httpParams[item] === []) {
                delete httpParams[item];
            }
        }
        const header = {};
        if (httpParams) {
            header['params'] = httpParams;
        }
        return this.http.delete(this.apiUrl + url, header);
    }
}
