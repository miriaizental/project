import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnewcall',
  templateUrl: './createnewcall.component.html',
  styleUrls: ['./createnewcall.component.css']
})
export class CreatenewcallComponent implements OnInit {

  createNewCallForm: FormGroup


  constructor(private route: Router) { }

  ngOnInit(): void {

    this.createNewCallForm = new FormGroup({
      details: new FormControl('', Validators.required)
    })

  }

  send() {
    if (this.createNewCallForm.valid) {
      this.route.navigate(['/'])
    }
    else {
      this.createNewCallForm.markAllAsTouched();

    }
  }

}
