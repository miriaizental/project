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

  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) {



  }

  ngOnInit(): void {


    this.volunteeringservice.getPosition().then(pos => {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
    //this.volunteeringservice.GetAddress()


  }


  askForHelp() {

    if (localStorage.getItem("login") == "") {
      this.route.navigate(['/signin'])
    }
    else {
      this.route.navigate(['/askforhelp'])
    }
  }

  signup() {

    this.Logout()
    var x = window.confirm("האם הינך רוצה להרשם כמתנדב או לבקשת עזרה?")
    if (x)
      this.route.navigate(["/signup"])
    else
      this.route.navigate(["/volunteersignup"])


  }
  Logout() {
    localStorage.setItem("login", "")
    this.volunteeringservice.logIn = ''
  }


}
