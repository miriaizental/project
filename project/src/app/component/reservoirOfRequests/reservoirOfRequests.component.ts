import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { AskForHelp } from 'src/app/models/askForHelp'
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservoirOfRequests',
  templateUrl: './reservoirOfRequests.component.html',
  styleUrls: ['./reservoirOfRequests.component.css']
})
export class reservoirOfRequestsComponent implements OnInit {

  requests: Array<object>
  isshown: Array<boolean>

  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) {

  }

  ngOnInit(): void {
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
    }
    );

  }

  getDetails(n: any) {
    for (let i = 0; i < this.isshown.length; i++) {
      this.isshown[i] = false
    }
    this.isshown[n] = true
  }

  response(requestNumber: number) {
  }

}
