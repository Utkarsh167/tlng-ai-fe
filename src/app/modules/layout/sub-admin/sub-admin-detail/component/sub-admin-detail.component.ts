import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubAdminDetailService } from '../service/sub-admin-detail.service';
import { SUBADMIN_LIST } from 'src/app/constant/absolute-routes';

@Component({
  selector: 'app-sub-admin-detail',
  templateUrl: './sub-admin-detail.component.html',
  styleUrls: ['./sub-admin-detail.component.scss']
})
export class SubAdminDetailComponent implements OnInit {

  subAdmin: any;
  subAdminId: string;

  constructor(
    private _subAdminDetailService: SubAdminDetailService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.subAdminId = this._route.snapshot.params.subAdminId;
    this.getSubAdminDetail();
    console.log(this.subAdminId)
  }

  getSubAdminDetail() {
    this._subAdminDetailService.getDetail(this.subAdminId).subscribe(
      response => {
        console.log(response);
        if (!response.data) {
          this._router.navigate([SUBADMIN_LIST]);
        }
        this.subAdmin = response.data;
        console.log(this.subAdmin);
      },
      err => {
        this._router.navigate([SUBADMIN_LIST]);

      }
    )
  }

  async changeStatus(status, userId) {
    try {
      let data = await this._subAdminDetailService.changeStatus({ status, userId });
      if (data) {
        this.getSubAdminDetail();
      }
    } catch (err) {
    }
  }

}
