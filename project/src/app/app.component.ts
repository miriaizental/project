import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {


  title = 'project';


  constructor(private location: Location, private route: Router, private vs: VolunteeringserviceService) {
    //localStorage.clear()
    //this.vs.evtSource.onmessage = function () { console.log("refresh");}


    if (this.location.path() == "") {
      this.route.navigate(['/home'])
      //localStorage.removeItem("login")
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

