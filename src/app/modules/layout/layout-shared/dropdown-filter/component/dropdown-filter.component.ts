import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {

  @Input() dropdown:DropDown;
  constructor() { }
  selected = "";

  ngOnInit() {
  }

}

interface DropDown {
  control: FormControl,
  label: string,
  list: { viewValue: string, value: string }[],
  multiple?:boolean
}
