import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import {
  TEST_DATA,
} from "../../../../constant/socket-events";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  socket: any;
  socketUrl: string = environment.socketUrl;
  token: string = localStorage.getItem("ai-admin-token");

  constructor() {}

  initialiseSocket(isMain) {
    // For connecting the socket
    if (isMain) {
      this.socket = io(this.socketUrl, {
        query: { authorization: this.token },
        secure: true,
        transports: ["websocket"]
      });
      //  localStorage.debug = '*';
    }else {
      if (!this.socket) {
        this.socket = io(this.socketUrl, {
          query: { authorization: this.token },
          secure: true,
          transports: ["websocket"]
        });
        //  localStorage.debug = '*';
      }
    }
    this.onReconnect();
  }

  onReconnect() {
    this.socket.on("reconnect", (attemptNumber: any) => {});
  }

  onClose(){
    this.socket.close();
  }


  getTestData(): Observable<any> {
    return new Observable(observer => {
      this.socket.on(TEST_DATA, (data: any) => {
        observer.next(data);
      });
    });
  }

}
