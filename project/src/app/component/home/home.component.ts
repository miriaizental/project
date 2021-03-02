import { Route } from '@angular/compiler/src/core';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login=localStorage.getItem("login");
  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) {
    


  }

  ngOnInit(): void {

  }


  askForHelp() {

    if (localStorage.getItem("login") == "") {
      this.route.navigate(['/signin'])
    }
    else {
      this.route.navigate(['/askforhelp'])
    }
  }

  

}
