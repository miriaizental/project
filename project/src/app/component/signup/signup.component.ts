import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  constructor(private volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('',Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(10),Validators.pattern('^[0-9]*')])),
      city: new FormControl('', Validators.required),
      restriction: new FormControl('', Validators.required)
    })
  }
  sendData() {
    if(this.signUpForm.valid==true){      
    this.volunteeringservice.postSignUp(this.signUpForm.controls.userName.value, this.signUpForm.controls.password.value, this.signUpForm.controls.phone.value,
      this.signUpForm.controls.city.value, this.signUpForm.controls.restriction.value).subscribe();
      this.signUpForm.reset();
    }
    else{

      
    }
      
  }

}
