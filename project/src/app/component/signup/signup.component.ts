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
  checkpassword:boolean

  constructor(private route: Router, private volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*')])),
      city: new FormControl('', Validators.required),
      restriction: new FormControl('', Validators.required)
    })
    this.checkpassword=false
  }

  checkPassword():void {
    let val=this.signUpForm.controls.password.value
    if (val == '')
      return null;
    this.volunteeringservice.checkPassword(val).subscribe((val) => {
      if (val == false) {
        console.log(false)
        this.checkpassword=true
      }
      else{
        console.log(true)
        this.checkpassword=false
      }
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

    this.volunteeringservice.SignUp(user).subscribe((data)=>{
      alert('ok')
      this.route.navigate(['/'])
    });
    
  }
  else {
    this.signUpForm.markAllAsTouched();
  }
}

}
