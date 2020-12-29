import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  constructor(private route: Router) { }

  connection


  public connect() {

    this.connection = new WebSocket('ws://localhost:8080');
    if (this.connection.readyState === this.connection.OPEN)
      this.connection.send('aaa')
    this.connection.onerror = error => { console.log(`WebSocket error: ${error}`) }
    this.connection.onopen = () => { console.log('connect'); }
    this.connection.onmessage = (mess) => { console.log(mess.data);window.location.reload();}
    this.connection.onclose = () => { console.log('connection is closed'); }

  }

  public send() {
    // console.log(this.connection.readyState === this.connection.OPEN);
    // if (this.connection.readyState === this.connection.OPEN) {
      this.connection.send('refresh')
      console.log('send');
  }


}
