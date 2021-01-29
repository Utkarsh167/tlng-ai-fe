import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent  {

  title = 'Confirmation';
  message = '';
  responseData: any;
  isReject: boolean = false;
  no = 'No';
  yes = 'Yes';
  showCancelButton = true;
  showTextBox = false;
  successIcon;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = data.title||this.title;
    this.message = data.message;
    this.no = data.no || this.no;
    this.yes = data.yes || this.yes;
    this.successIcon = data.successIcon;
    this.showTextBox = data.showTextBox;
    this.showCancelButton = !data.hideCancelButton;

    this.responseData = {
      status: data.status,
      note: ''
    };

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    if (this.showTextBox && this.responseData.note.trim() == '') return;
  }
}
