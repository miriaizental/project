import { JsonPipe, Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { getJSON } from 'jQuery';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy {


  title = 'project';
  login = localStorage.getItem("login");
  role = localStorage.getItem("role")

  constructor(private location: Location, private route: Router, private vs: VolunteeringserviceService) {

    // getJSON('http://gd.geobytes.com/GetCityDetails',(data)=>{
    //   console.log(JSON.stringify(data,null,2));

    // })
    console.log(window.navigator)

    if (this.location.path() == "") {
      this.route.navigate(['/home'])
    }

    if (localStorage.getItem("login") == null) {
      localStorage.setItem("login", "")
      localStorage.setItem("role", "")
    }
    //localStorage.setItem("ipaddress","")
    console.log("login: " + localStorage.getItem("login"));
    console.log("role: " + localStorage.getItem("role"));

  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }

  isLogedIn() {
    if (this.vs.logIn && this.vs.logIn != '')
      return true;
    return false;
  }

  Logout() {
    localStorage.setItem("login", "")
    localStorage.setItem("role", "")
    this.vs.logIn = '';
    this.login = '';
    this.vs.role = '';
    this.role = '';
    this.route.navigate(['/home'])
  }
  goHome() {
    this.route.navigate(['/home'])
  }

  GoBack() {
    this.location.back()
  }



}

