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

  constructor(private volunteeringservice: VolunteeringserviceService, private route: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  }

  send() {
    if (this.signInForm.valid) {
      this.volunteeringservice.SignIn(this.signInForm.controls.userName.value, this.signInForm.controls.password.value).subscribe((data) => {
        console.log(data);
        if (data) {
          this.volunteeringservice.logIn=this.signInForm.controls.password.value
          console.log('login: '+this.volunteeringservice.logIn);
          this.route.navigate(['/createnewcall'])
        }
        else{
          alert('שם משתמש או סיסמה שגויים')
        }
      })



    }
    else {
      this.signInForm.markAllAsTouched();

    }
  }

}
