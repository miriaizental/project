import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'


@Component({
  selector: 'app-requestinmycare',
  templateUrl: './requestinmycare.component.html',
  styleUrls: ['./requestinmycare.component.css']
})
export class RequestinmycareComponent implements OnInit {
  requestsinmycare: Array<object>


  constructor(private Volunteeringservice: VolunteeringserviceService,private ws: WebSocketServiceService) { 

    //this.GetvolunteerRequests()


  }

  ngOnInit(): void {
    this.GetvolunteerRequests()

  }

  GetvolunteerRequests() {

    this.Volunteeringservice.getVolunteerRequests().subscribe((ans) => {
      this.requestsinmycare = new Array<object>()

        this.requestsinmycare=ans
    })

  }

  returnRequest(num:number){
    var answer = window.confirm("האם אתה בטוח שברצונך להחזיר את הבקשה למאגר?")
    if(answer){
      this.Volunteeringservice.ReturnRequest(num).subscribe((ans)=>{
        this.Volunteeringservice.getVolunteerRequests().subscribe((ans) => {
          this.requestsinmycare = new Array<object>()
    
            this.requestsinmycare=ans
            this.ws.send()
        })
        
      })

    }
  }
}
