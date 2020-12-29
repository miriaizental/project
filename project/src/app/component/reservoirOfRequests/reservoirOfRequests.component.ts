import { Component, OnInit, OnDestroy } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { AskForHelp } from 'src/app/models/askForHelp'
import { Router } from '@angular/router';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'
// const connection = new WebSocket('ws://localhost:8080');


@Component({
  selector: 'app-reservoirOfRequests',
  templateUrl: './reservoirOfRequests.component.html',
  styleUrls: ['./reservoirOfRequests.component.css']
})
export class reservoirOfRequestsComponent implements OnInit, OnDestroy {

  requests: Array<object>
  isshown: Array<boolean>
  //connection = new WebSocket('ws://localhost:8080');

  constructor(private volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService, private route: Router) {
    // connection.onerror = error => {
    //   console.log(`WebSocket error: ${error}`)
    // }
    // connection.onopen = () => {
    //   console.log('connect');
    // }
    // connection.onmessage = (mess) => {
    //   console.log(mess.data);
    //   this.getAllRequests()

    // }
    // connection.onclose = () => {
    //   console.log('connection is closed');
    // }
    ws.connect()
  }


  ngOnInit(): void {
    this.getAllRequests()
  }
  ngOnDestroy() {
    // connection.close()
  }

  isOpen(ws) { return ws.readyState === ws.OPEN }


  getAllRequests() {
    this.requests = new Array<object>()
    this.volunteeringservice.getAllRequests().subscribe((ans) => {
      var len = 0
      ans.forEach((x) => {
        this.requests.push(x)
        len = Math.max(x.requestNumber, len)
      })

      this.isshown = new Array<boolean>()
      for (let i = 0; i <= len; i++) {
        this.isshown.push(false)
      }
    })
  }

  getDetails(n: any) {
    for (let i = 0; i < this.isshown.length; i++) {
      this.isshown[i] = false
    }
    this.isshown[n] = true
  }

  response(requestNumber: number) {
    //להפוך
    this.volunteeringservice.RequestWasGranted(requestNumber).subscribe(data => {
      if (!data) {

        var answer = window.confirm(" מרגע זה הבקשה תעבור לטיפולך, האם הינך בטוח?")
        if (answer) {
          this.volunteeringservice.updateRequestGranted(requestNumber).subscribe((data) => {
            // connection.send('refresh')
            this.ws.send()
            this.route.navigate(['/requestinmycare'])
          })
        }
      }
      else {
        alert("תודה על ההענות, אך בקשה זו כבר בטיפול")
        this.getAllRequests()
      }

    })





  }
}
