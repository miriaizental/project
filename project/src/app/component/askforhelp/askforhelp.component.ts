import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { askForHelp } from 'src/app/models/askForHelp'
import { Router } from '@angular/router';

@Component({
  selector: 'app-askforhelp',
  templateUrl: './askforhelp.component.html',
  styleUrls: ['./askforhelp.component.css']
})
export class AskforhelpComponent implements OnInit {

  requests: Array<askForHelp>

  constructor(private volunteeringservice: VolunteeringserviceService,private route: Router) { }

  ngOnInit(): void {
  // this.volunteeringservice.getRequests().subscribe(ans=>this.requests=ans);
  }

}
