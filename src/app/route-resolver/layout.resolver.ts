import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";
import { DataTransferService } from "../modules/shared/services/data-transfer.service";
import { LOGIN } from "../constant/absolute-routes";

@Injectable({
    providedIn: 'root'
})

export class LayoutResolver implements Resolve<any> {
    constructor(
        private _dataTransferService: DataTransferService,
        private _router:Router
    ) { }

    resolve() {
        return new Promise((resolve, reject) => {
            this._dataTransferService.getProfileDetail().subscribe(
                data => {
                    if (data) {
                        resolve(true);
                    } else {
                        localStorage.clear();
                        this._router.navigate([LOGIN]);
                        reject(true);
                    }
                }
            )
        })
    }
}