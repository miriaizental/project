import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { User } from 'src/app/models/User'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  checkpassword: boolean

  constructor(private route: Router, private vs: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[-_a-zA-Zא-ת0-9]*')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*')])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      city: new FormControl('', Validators.required),
      restriction: new FormControl('', Validators.required)
    })
    this.checkpassword = true
  }

  checkPassword(): void {
    let val = this.signUpForm.controls.password.value
    this.vs.checkPassword(val).subscribe((data) => {
      if (data['DATA'] == false) {
        this.checkpassword = false
      }
      else {
        this.checkpassword = true
      }
    })

  }

  sendData() {
    if (this.signUpForm.valid == true && this.checkpassword == true) {

      let user = new User()

      user.password = this.signUpForm.controls.password.value
      user.userName = this.signUpForm.controls.userName.value
      user.phone = this.signUpForm.controls.phone.value
      user.email=this.signUpForm.controls.email.value
      user.city = this.signUpForm.controls.city.value
      user.restriction = this.signUpForm.controls.restriction.value

      this.vs.SignUp(user).subscribe((data) => {


        if (data['STATUS'] == 'SUCCESS') {
          localStorage.setItem("login", user.password)
          this.vs.logIn=user.password;
          this.route.navigate(['/home'])
        }
        alert(data['MESSAGE'])

      });

    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
