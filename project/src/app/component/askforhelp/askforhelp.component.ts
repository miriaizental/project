import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'


@Component({
  selector: 'app-askforhelp',
  templateUrl: './askforhelp.component.html',
  styleUrls: ['./askforhelp.component.css']
})
export class AskforhelpComponent implements OnInit {

  userRequests: Array<object>


  constructor(private Volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.UserRequest()

  }

  UserRequest() {
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
        alert("בקשתך הוסרה מהמאגר")
        this.UserRequest()
        
      })
    }
  }
}
