import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AskForHelp } from 'src/app/models/askForHelp';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'

@Component({
  selector: 'app-createnewcall',
  templateUrl: './createnewcall.component.html',
  styleUrls: ['./createnewcall.component.css']
})
export class CreatenewcallComponent implements OnInit {

  createNewCallForm: FormGroup

  constructor(private route: Router, private Volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {

    this.createNewCallForm = new FormGroup({
      details: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      city: new FormControl(''),
      street: new FormControl('')
    })

  }

  send() {
    this.createNewCallForm.controls['street'].setValidators([Validators.required])
    this.createNewCallForm.controls['city'].setValidators([Validators.required])
    this.createNewCallForm.controls['street'].updateValueAndValidity()
    this.createNewCallForm.controls['city'].updateValueAndValidity()

    if (this.createNewCallForm.valid) {
      let call = new AskForHelp()
      call.password = this.Volunteeringservice.logIn
      call.requestDetails = this.createNewCallForm.controls['details'].value
      call.time = this.createNewCallForm.controls['time'].value
      call.street = this.createNewCallForm.controls['street'].value
      call.city = this.createNewCallForm.controls['city'].value

      this.Volunteeringservice.createNewCall(call).subscribe((data)=>{
        alert('בקשתך נכנסה למאגר');
        this.route.navigate(['/'])
      })
    }
    else {
      this.createNewCallForm.markAllAsTouched();
    }
  }

}
