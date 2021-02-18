import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AskForHelp } from 'src/app/models/askForHelp';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service'


@Component({
  selector: 'app-createnewcall',
  templateUrl: './createnewcall.component.html',
  styleUrls: ['./createnewcall.component.css']
})
export class CreatenewcallComponent implements OnInit {

  createNewCallForm: FormGroup

  constructor(private route: Router, private Volunteeringservice: VolunteeringserviceService, private ws: WebSocketServiceService) {
    ws.connect()
  }

  ngOnInit(): void {

    this.createNewCallForm = new FormGroup({
      details: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      city: new FormControl(''),
      street: new FormControl('')
    })

  }

  async send() {
    if (this.createNewCallForm.controls['location'].value == 'באופן ידני') {
      this.createNewCallForm.controls['street'].setValidators([Validators.required])
      this.createNewCallForm.controls['city'].setValidators([Validators.required])
      this.createNewCallForm.controls['street'].updateValueAndValidity()
      this.createNewCallForm.controls['city'].updateValueAndValidity()
    }

    if (this.createNewCallForm.valid) {
      let call = new AskForHelp()

      if (this.createNewCallForm.controls['location'].value == 'באופן ידני') {
        call.password = localStorage.getItem("login")
        call.requestDetails = this.createNewCallForm.controls['details'].value
        call.time = this.createNewCallForm.controls['time'].value
        call.street = this.createNewCallForm.controls['street'].value
        call.city = this.createNewCallForm.controls['city'].value
      }
      else {

        await this.getPosition().then(async pos => {

          await this.GetAddress(pos.lat, pos.lng).then(x => {

            call.city = x.town
            call.street = x.road + ' ' + x.house_number

          })
        });
        call.password = localStorage.getItem("login")
        call.requestDetails = this.createNewCallForm.controls['details'].value
        call.time = this.createNewCallForm.controls['time'].value


      }

      this.Volunteeringservice.createNewCall(call).subscribe((data) => {


        alert(data["MESSAGE"]);
        this.ws.send()
        // this.ws.close()
        //this.ws.connect()
        this.route.navigate(['/askforhelp'])
      })
    }
    else {
      this.createNewCallForm.markAllAsTouched();
    }
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {


        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });

      },
        err => {
          reject(err);
        });
    });

  }
  async GetAddress(latitude, longitude) {

    var resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=` + latitude + `&lon=` + longitude + `&zoom=18&addressdetails=1`);
    var state = await resp.json(); // כאן יש לך הכל
    return state.address

  }

}
