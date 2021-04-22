import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-askforhelp',
  templateUrl: './askforhelp.component.html',
  styleUrls: ['./askforhelp.component.css']
})
export class AskforhelpComponent implements OnInit {

  userRequests: Array<object>


  constructor(private Volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService, private route: Router) {
    this.GetUserRequests()

    ws.connect()
  }

  ngOnInit(): void {
    this.GetUserRequests()
  }

  GetUserRequests() {

    this.Volunteeringservice.getUserRequests().subscribe((ans) => {
      this.userRequests = new Array<object>()
      ans.forEach(element => {
        this.userRequests.push(element)
      });
    })

  }

  RemoveRequest(reqnum: number) {
    var answer = window.confirm("האם אתה בטוח שהינך רוצה להסיר בקשה זו?")
    if (answer) {
      this.Volunteeringservice.removeRequest(reqnum).subscribe((data) => {
        if (data['STATUS'] == 'SUCCESS') {
          this.Volunteeringservice.getUserRequests().subscribe((ans) => {
            debugger;
            this.userRequests = new Array<object>()
            ans.forEach(element => {
              this.userRequests.push(element)
            });
            this.ws.send()
          })
          
        }
      })
    }
  }

  feedback(reqnum: number) {
    this.route.navigate(['/feedback'])
    this.Volunteeringservice.removeRequest(reqnum).subscribe()

  }
}