import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Pagination } from "src/app/models/pagination";
@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent extends Pagination implements OnInit {

  IMAGE_SRC: any;
  scopeMapData: any;
  snapShotData: any;
  imageSize: any;
  withImage: boolean;

  constructor(
    public dialogRef: MatDialogRef<MapviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.IMAGE_SRC = data.imageUrl;
    this.scopeMapData = this.data.scopedata;
    this.snapShotData = this.data.snapShotdata;
    this.imageSize = this.data.size;
    this.withImage = data.withImage;
  }
  ngOnInit() {
    console.log(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
