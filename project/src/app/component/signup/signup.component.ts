import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';
import { User } from 'src/app/models/User'
import { passwordValidator } from 'src/app/validators/password.validator'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  constructor(private volunteeringservice: VolunteeringserviceService,private passValidator:passwordValidator) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required,this.passValidator.checkPassword()])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*')])),
      city: new FormControl('', Validators.required),
      restriction: new FormControl('', Validators.required)
    })
  }

  sendData() {
    if (this.signUpForm.valid == true) {

      let user = new User()

      user.password = this.signUpForm.controls.password.value,
        user.userName = this.signUpForm.controls.userName.value,
        user.phone = this.signUpForm.controls.phone.value,
        user.city = this.signUpForm.controls.city.value,
        user.restriction = this.signUpForm.controls.restriction.value

      this.volunteeringservice.SignUp(user).subscribe((user) => console.log(user));
    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
