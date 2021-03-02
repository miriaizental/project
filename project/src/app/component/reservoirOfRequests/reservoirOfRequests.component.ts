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

  requests: Array<object>;
  login=localStorage.getItem("login");
  constructor(private volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService, private route: Router) {


    this.getAllRequests();
    ws.connect()
  }


  ngOnInit(): void {
    this.ws.wsUpdate.subscribe(

      (data) => {
        this.getAllRequests();
      }
      , (error) => {
        console.log(error);
      })

  }
  ngOnDestroy() {

    // connection.close()
  }

  isOpen(ws) { return ws.readyState === ws.OPEN }


  getAllRequests() {
    this.requests = new Array<object>()

    this.volunteeringservice.getAllRequests().subscribe((ans) => {
      this.requests = ans
      //console.log("reached getAllRequests ====" + ans.length);
    })
  }



  response(requestNumber: number) {

    var answer = window.confirm(" מרגע זה הבקשה תעבור לטיפולך, האם הינך בטוח?")
    debugger;
    if (answer) {
      this.volunteeringservice.RequestWasGranted(requestNumber).subscribe(data => {
        if (data['DATA'] == 0) {

          this.volunteeringservice.updateResponseDate(requestNumber).subscribe((data) => {
            if (data['STATUS'] != 'SUCCESS')
              alert(data['MESSAGE'])
              this.volunteeringservice.updateRequestGranted(requestNumber).subscribe((data) => {
                // connection.send('refresh')
                if (data['STATUS'] == 'SUCCESS') {
                  this.ws.send()
                  this.ws.close()
                  this.route.navigate(['/requestinmycare'])
                }
                else {
                  alert(data['MESSAGE'])
                }
              })
          })
          // this.volunteeringservice.updateRequestGranted(requestNumber).subscribe((data) => {
          //   // connection.send('refresh')
          //   if (data['STATUS'] == 'SUCCESS') {
          //     this.ws.send()
          //     this.ws.close()
          //     this.route.navigate(['/requestinmycare'])
          //   }
          //   else {
          //     alert(data['MESSAGE'])
          //   }
          // })
        }
        else {
          alert("תודה על ההענות, אך בקשה זו כבר בטיפול")
        }
      })
    }





  }
}
