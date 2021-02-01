import { Component, OnInit } from '@angular/core';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';


@Component({
  selector: 'app-requestinmycare',
  templateUrl: './requestinmycare.component.html',
  styleUrls: ['./requestinmycare.component.css']
})
export class RequestinmycareComponent implements OnInit {
  requestsinmycare: Array<object>


  constructor(private Volunteeringservice: VolunteeringserviceService) { 

    this.GetvolunteerRequests()


  }

  ngOnInit(): void {
    
  }

  GetvolunteerRequests() {

    this.requestsinmycare = new Array<object>()
    this.Volunteeringservice.getVolunteerRequests().subscribe((ans) => {
      ans.forEach(element => {
        this.requestsinmycare.push(element)
      });
    })

  }
}
