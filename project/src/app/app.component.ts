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


  constructor(private location: Location, private route: Router, private vs: VolunteeringserviceService) {
    // getJSON('http://gd.geobytes.com/GetCityDetails',(data)=>{
    //   console.log(JSON.stringify(data,null,2));
      
    // })

    console.log(
    window.navigator)

    if (this.location.path() == "") {
      this.route.navigate(['/home'])
    }

    if (localStorage.getItem("login") == null) {
      localStorage.setItem("login", "")
    }

    console.log("login: " + localStorage.getItem("login"));


  }



  ngOnInit() {
  }

  ngOnDestroy() {
  }

  Logout() {
    localStorage.setItem("login", "")
    this.vs.logIn = ''
  }

  GoBack() {
    this.location.back()
  }

  IsLogedIn() {
    if (localStorage.getItem("login") == '')
      return false
    return true
  }



}

