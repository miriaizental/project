import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.route.navigate(["/askforhelp"])
    console.log(this.route);
    
  }

  askForHelp(){
    this.route.navigate(["/signin"])
  }

  signup(){
    this.route.navigate(["/signup"])
  }
  requests(){
    this.route.navigate(["/askforhelp"])

  }
}
