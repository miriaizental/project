import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { ManagerSignUp } from 'src/app/models/Managersignup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newmanager',
  templateUrl: './newmanager.component.html',
  styleUrls: ['./newmanager.component.css']
})
export class NewmanagerComponent implements OnInit {

  ManagerSignUpForm: FormGroup
  checkpassword: boolean


  constructor(private vs: VolunteeringserviceService, private route: Router) { }

  ngOnInit(): void {
    this.ManagerSignUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[-_a-zA-Z0-9]*')])),

      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*')])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))

    })
    this.checkpassword = true

  }
  checkPassword(): void {
    let val = this.ManagerSignUpForm.controls.password.value
    
    this.vs.checkPassword(val,3).subscribe((data) => {
      if (data['DATA'] == false) {
        this.checkpassword = false
      }
      else {
        this.checkpassword = true
      }
    })

  }
  sendData() {
    if (this.ManagerSignUpForm.valid == true && this.checkpassword == true) {
      let managersignup = new ManagerSignUp()

      managersignup.password = this.ManagerSignUpForm.controls.password.value
      managersignup.userName = this.ManagerSignUpForm.controls.userName.value
      managersignup.phone = this.ManagerSignUpForm.controls.phone.value
      managersignup.email = this.ManagerSignUpForm.controls.email.value

      this.vs.ManagerSignup(managersignup).subscribe((data) => {

        if (data['STATUS'] == 'SUCCESS') {

          localStorage.setItem("login", managersignup.password)
          this.vs.logIn = managersignup.password;
          this.route.navigate(['/home'])
        }
        alert(data['MESSAGE'])
      })
    }
    else {
      this.ManagerSignUpForm.markAllAsTouched();
    }

  }


}
