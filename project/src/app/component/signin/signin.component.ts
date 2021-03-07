import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup

  constructor(private vs: VolunteeringserviceService, private route: Router) { }

  ngOnInit(): void {

    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      type:new FormControl('',Validators.required)
    })

  }

  send() {
    if (this.signInForm.valid) {
      this.vs.SignIn(this.signInForm.controls.userName.value, this.signInForm.controls.password.value,this.signInForm.controls.type.value).subscribe((data) => {
        if (data['DATA']) {
          localStorage.setItem("login", this.signInForm.controls.password.value)
          this.route.navigate(['/home'])
        }
        else {
          alert(data['MESSAGE'])
          this.signInForm.reset()
        }
      })



    }
    else {
      this.signInForm.markAllAsTouched();

    }
  }
  

}
