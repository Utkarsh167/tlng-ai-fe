import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { POPUP_MESSAGES, SOMETHING_WENT_WRONG } from '../../../constant/messages';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
@Injectable()
export class UtilityService {
    constructor(
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) {
    }
    clearStorage() {
        localStorage.removeItem('ai-admin-token');
        localStorage.removeItem('ai-admin-name');
        localStorage.removeItem('ai-admin-id');
    }
    getAuthToken() {
        return localStorage.getItem('ai-admin-token');
    }

    showAlert(message, type?) {

        this._snackBar.open(message, 'Close', {
            duration: 4000,
        });
    }
    trim(data) {
        for (const item in data) {
            if (typeof data[item] === 'string') {
                data[item] = data[item].trim();
            }
        }
        return data;
    }
    errorAlert(error) {
        let data = {
            title: '',
            message: (error && error.error && error.error.message) ? (error.error.message) : SOMETHING_WENT_WRONG,
            yes: POPUP_MESSAGES.close,
            hideCancelButton: true
        }
        this.openDialog(data).subscribe(success => {

        });
    }
    openDialog(data) {
        const dialogRef = this._dialog.open(ConfirmationModalComponent, {
            width: '500px',
            data: data
        });
        return dialogRef.afterClosed();
    }

}

