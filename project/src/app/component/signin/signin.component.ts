import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup

  constructor(private volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  send(){

    if (this.signInForm.valid) {
      // this.volunteeringservice.postSignIn(this.signInForm.controls.name.value, this.signInForm.controls.password.value)
      // this.signInForm.reset()
    }
    else {

    }
  }

}
