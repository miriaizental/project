import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) { }

  ngOnInit(): void {

  }


  logup(x) {
    if (x == 1)
      this.route.navigate(["/signup"])
    else
      this.route.navigate(["/volunteersignup"])

  }
}
