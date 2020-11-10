import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms'
import { VolunteeringserviceService } from '../services/volunteeringservice.service';

@Injectable({
    providedIn: 'root'
})

export class passwordValidator {
    constructor(private Volunteeringservice: VolunteeringserviceService) { }

    checkPassword(): ValidatorFn {
        return (control: FormControl): { key: {value:string} } => {
            const val = control.value
            if (val == '')
                return null;
            this.Volunteeringservice.checkPassword(val).subscribe((val) => {
                console.log(JSON.stringify(val));
                if (val == false) {
                    return { passwordError: "שם משתמש תפוס" }
                }
                return null;
            })
            
        }
    }

}