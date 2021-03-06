import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { VolunteerSignUp } from 'src/app/models/VolunteerSignUp'
import { Router } from '@angular/router';


@Component({
  selector: 'app-volunteersignup',
  templateUrl: './volunteersignup.component.html',
  styleUrls: ['./volunteersignup.component.css']
})
export class VolunteersignupComponent implements OnInit {

  volunteerSignUpForm: FormGroup
  checkpassword: boolean

  constructor(private route: Router, private vs: VolunteeringserviceService) {
  }

  ngOnInit(): void {
    this.volunteerSignUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[-_a-zA-Z0-9]*')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*')])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email]))

    })
    this.checkpassword = true

  }

  checkPassword(): void {
    let val = this.volunteerSignUpForm.controls.password.value
    this.vs.checkPassword(val,2).subscribe((data) => {
      if (data['DATA'] == false) {
        this.checkpassword = false
      }
      else {
        this.checkpassword = true
      }
    })

  }


  sendData() {
    if (this.volunteerSignUpForm.valid == true && this.checkpassword == true) {

      let volunteersignup = new VolunteerSignUp()

      volunteersignup.password = this.volunteerSignUpForm.controls.password.value
      volunteersignup.userName = this.volunteerSignUpForm.controls.userName.value
      volunteersignup.phone = this.volunteerSignUpForm.controls.phone.value
      volunteersignup.email=this.volunteerSignUpForm.controls.email.value
      volunteersignup.ipAddress = this.vs.ipAddress
      this.vs.VolunteerSignUp(volunteersignup).subscribe((data) => {


        if (data['STATUS'] == 'SUCCESS') {

          localStorage.setItem("login", volunteersignup.password)
          localStorage.setItem("role","volunteer")
          this.vs.logIn= "volunteer";

          this.vs.logIn= volunteersignup.password;
          this.vs.role="volunteer"
          this.route.navigate(['/home'])
        }
        alert(data['MESSAGE'])

      });

    }
    else {
      this.volunteerSignUpForm.markAllAsTouched();
    }
  }

}
