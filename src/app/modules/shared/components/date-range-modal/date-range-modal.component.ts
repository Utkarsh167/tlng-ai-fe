import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-range-modal',
  templateUrl: './date-range-modal.component.html',
  styleUrls: ['./date-range-modal.component.scss']
})
export class DateRangeModalComponent {

  title = 'Confirmation';
  message = '';
  responseData: any;
  isReject: boolean = false;
  no = 'No';
  yes = 'Yes';
  showCancelButton = true;
  showTextBox = false;
  successIcon;
  public todayDate: any = new Date();
  todayMin: any;
  validMin: any;

  constructor(
    private dialogRef: MatDialogRef<DateRangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title || this.title;
    this.message = data.message;
    this.no = data.no || this.no;
    this.yes = data.yes || this.yes;
    this.successIcon = data.successIcon;
    this.showTextBox = data.showTextBox;
    this.showCancelButton = !data.hideCancelButton;

    this.responseData = {
      validTill: '',
      validFrom: ''
    };

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    if (this.showTextBox && this.responseData.note.trim() == '') return;
  }

  onChange(event) {
    console.log(event);
    this.validMin = new Date(event);
  }
}
