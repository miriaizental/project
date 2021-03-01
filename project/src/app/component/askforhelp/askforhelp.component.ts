import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'


@Component({
  selector: 'app-askforhelp',
  templateUrl: './askforhelp.component.html',
  styleUrls: ['./askforhelp.component.css']
})
export class AskforhelpComponent implements OnInit {

  userRequests: Array<object>


  constructor(private Volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService) {
    this.GetUserRequests()
    ws.connect()
  }

  ngOnInit(): void {
    this.ws.wsUpdate.subscribe(

      (data) => {
        this.GetUserRequests();
      }
      , (error) => {
        console.log(error);
      })
  }

  GetUserRequests() {

    this.userRequests = new Array<object>()
    this.Volunteeringservice.getUserRequests().subscribe((ans) => {
      ans.forEach(element => {
        this.userRequests.push(element)
      });
    })

  }

  RemoveRequest(reqnum: number) {
    var answer = window.confirm("האם אתה בטוח שהינך רוצה להסיר בקשה זו?")
    if (answer) {
      this.Volunteeringservice.removeRequest(reqnum).subscribe((data) => {
        this.ws.send()
        //this.ws.connect()
        this.ws.close()

      })
    }
  }
}