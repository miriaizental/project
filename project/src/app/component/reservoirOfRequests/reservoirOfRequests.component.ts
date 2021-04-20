import { Component, OnInit, OnDestroy } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { AskForHelp } from 'src/app/models/askForHelp'
import { Router } from '@angular/router';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'
// const connection = new WebSocket('ws://localhost:8080');
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-reservoirOfRequests',
  templateUrl: './reservoirOfRequests.component.html',
  styleUrls: ['./reservoirOfRequests.component.css']
})
export class reservoirOfRequestsComponent implements OnInit, OnDestroy {
  //ipAddress:string;
  requests:Array<object>;
  login = localStorage.getItem("login");
  constructor(private http: HttpClient,private volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService, private route: Router) {

    this.volunteeringservice.getPosition().then(()=>{
      this.getAllRequests()
      ws.connect()
    })
    
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
    })
  }


  response(requestNumber: number) {

    if (this.login == '' || !this.login) {
      alert("עליך להתחבר למערכת על מנת להענות לבקשה")
    }
    else {
      var answer = window.confirm(" מרגע זה הבקשה תעבור לטיפולך, האם הינך בטוח?")
      if (answer) {
        this.volunteeringservice.RequestWasGranted(requestNumber).subscribe(data => {
          if (data['DATA'] == 0) {

            this.volunteeringservice.updateResponseDate(requestNumber).subscribe((data) => {
              if (data['STATUS'] != 'SUCCESS')
                alert(data['MESSAGE'])
              this.volunteeringservice.updateRequestGranted(requestNumber).subscribe((data) => {
                // connection.send('refresh')
                debugger
                if (data['STATUS'] == 'SUCCESS') {
                  this.route.navigate(['/requestinmycare'])
                  this.ws.send()
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

  contactUs(password: string) {
    if (this.login == '' || !this.login) {
      alert("עליך להתחבר למערכת על מנת ליצור קשר")
    }
    else {
      var answer = window.confirm("המשתמש יקבל את כתובת המייל שלך על מנת ליצור איתך קשר\n האם הינך מוכן לצעד זה?")
      if (answer) {
        this.volunteeringservice.ContactUs(password).subscribe()
        alert("פרטיך הועברו למשתמש , והוא ייצור איתך קשר בקרוב")
      }
    }
  }
}
