import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  public wsUpdate: Subject<any> = new Subject();

  constructor(private route: Router) { }

  connection


  public connect() {

    this.connection = new WebSocket('ws://localhost:8080');
    if (this.connection.readyState === this.connection.OPEN)
      this.connection.send('aaa')
    this.connection.onerror = error => { console.log(`WebSocket error: ${error}`) }
    this.connection.onopen = () => { console.log('connect'); }
    this.connection.onmessage = (mess) => {
      console.log(mess.data);
      this.wsUpdate.next(mess.data);
    }
    this.connection.onclose = () => { console.log('connection is closed'); }

  }

  public send() {
    this.connection.send('refresh')
    console.log('send');
  }
  public close() {
    this.connection.close()
  }


}
