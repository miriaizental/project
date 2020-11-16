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

  requests: Array<AskForHelp>

  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) {

  }

  ngOnInit(): void {
    this.requests = new Array<AskForHelp>()
    this.volunteeringservice.getAllRequests().subscribe((ans) => {
      ans.forEach((x) => {
        console.log(x);
        this.requests.push(x)
      })
    });

  }

  getDetails() {
    
  }

}
