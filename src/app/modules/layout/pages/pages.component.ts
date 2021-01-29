import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  dashboardInstance = "DashboardComponent";
  constructor() { }

  ngOnInit() {
  }

//  onActivate(componentRef) {
//   let appWrapper = document.getElementById("appWrapper");
//   let centerPanel = document.getElementById("centerPanel");

//     if(componentRef.constructor.name === this.dashboardInstance) {
//       appWrapper.classList.remove("app-in-wrapper");
//       centerPanel.classList.remove("center_panel");

//     } else {
//       appWrapper.classList.add("app-in-wrapper");
//       centerPanel.classList.add("center_panel");
//     }
// }

}
