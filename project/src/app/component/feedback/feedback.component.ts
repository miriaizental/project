import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteeringserviceService } from 'src/app/services/volunteeringservice.service'


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup


  constructor(private route: Router, private Volunteeringservice: VolunteeringserviceService) { }

  ngOnInit(): void {
    this.feedbackForm=new FormGroup({
      time:new FormControl(),
      satisfaction:new FormControl(),
      remarks:new FormControl()
    })
  }

  send(){
    let data={
      'time':this.feedbackForm.controls['time'].value,
      'satisfaction':this.feedbackForm.controls['satisfaction'].value,
      'remarks':this.feedbackForm.controls['remarks'].value
    }
    this.Volunteeringservice.sendfeedback(data)
    alert('תודה רבה!!\nדעתך חשובה לנו מאד')

  }

}
