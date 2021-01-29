import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// imported GENDER_COLOUR, GENDERS - Shivakumar A
import { GENDER_COLOUR, GENDERS } from '../../../../constant/app-constant'
@Component({
  selector: 'app-group-employee',
  templateUrl: './group-employee.component.html',
  styleUrls: ['./group-employee.component.scss']
})
export class GroupEmployeeComponent implements OnInit {
  data;
  // definded variables fro color and value - Shivakumar A
  maleValue: string;
  femaleValue: string;
  otherValue: string;
  maleColor: string;
  femaleColor: string;
  otherColor: string;

  constructor(public dialogRef: MatDialogRef<GroupEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private empdata: any, ) { 
      this.data = empdata;
      // Added color's and value - Shivakumar A
      this.maleColor = GENDER_COLOUR.MALE;
    this.femaleColor = GENDER_COLOUR.FEMALE;
    this.otherColor = GENDER_COLOUR.OTHER;
    this.maleValue = GENDERS[0].value;
    this.femaleValue = GENDERS[1].value;
    this.otherValue = GENDERS[2].value;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
