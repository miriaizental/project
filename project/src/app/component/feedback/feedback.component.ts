import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'
import { Statistics } from 'src/app/models/statistics'


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup


  constructor(private route: Router, private Volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      time: new FormControl(),
      satisfaction: new FormControl(),
      remarks: new FormControl()
    })
  }

  send() {
    let sta = new Statistics()

    sta.responseTime = this.feedbackForm.controls['time'].value
    sta.satisfaction = this.feedbackForm.controls['satisfaction'].value
    sta.remarks = this.feedbackForm.controls['remarks'].value

    this.Volunteeringservice.sendfeedback(sta).subscribe()

    alert('תודה רבה!!\nדעתך חשובה לנו מאד')

  }

}
