import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LoaderService } from './modules/shared/services/loader.service';
import { MessagingService } from './modules/shared/services/messaging.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loader = false;
  message;

  constructor(
    private _router: Router,
    private _loaderService: LoaderService,
    private messagingService: MessagingService,
    private permissionService: NgxPermissionsService
  ) {

  }

  ngOnInit() {
    this.listenRouterEvents();
    const userId = localStorage.getItem('ai-admin-id');
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.loadPermission();
  }

  loadPermission() {
    if (localStorage.getItem('adminPermission')) {
      this.permissionService.loadPermissions(JSON.parse(localStorage.getItem('adminPermission')));
    }
  }

  /**
   * Method For Initiating and stopping loader on route change
   */
  listenRouterEvents() {
    this._router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this._loaderService.loader.next(true)
      }
      else if (event instanceof NavigationEnd) {
        this._loaderService.loader.next(false)
      }
    });
    this._loaderService.loader.subscribe(
      data => {
        setTimeout(() => {
          this.loader = data;
        })
      }
    )
  }

}