import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AskForHelp } from '../models/askForHelp';
import { JsonPipe } from '@angular/common';
import { VolunteerSignUp } from '../models/VolunteerSignUp';
// import { GoogleMapsAPIWrapper } from '@agm/core';
//import {Observable} from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class VolunteeringserviceService {

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url = "http://localhost:3000"
  logIn
  ipAddress
  coordinates: any;


  constructor(private http: HttpClient) {
    this.logIn = localStorage.getItem("login")
    this.http.get('https://jsonip.com').subscribe((ipOfNetwork) => {
      this.ipAddress = ipOfNetwork['ip']
      console.log("ip:", this.ipAddress);

    })

  }
  ///////////////
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

  /////////////////////////////////////////////////////////////////////////////////



  GetAddress() {
    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      var resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=` + latitude + `&lon=` + longitude + `&zoom=18&addressdetails=1`);
      var state = await resp.json(); // כאן יש לך הכל
      var country = state.address.country;
      var city = state.address.city
      var street = state.address.road;
      var number = state.address.house_number;
      var display_name = state.display_name
      console.log('city',city, 'street',street,'number', number);

    }

    function error() {
      console.log(error);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }

  ///////////////////////



  updateRequestGranted(requestnumber: number): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/updateRequestGranted`, { "requestnumber": requestnumber, "login": this.logIn }, this.options)
  }

  getAllRequests(): Observable<AskForHelp[]> {
    return this.http.get<AskForHelp[]>(`${this.url}/api/allRequests`)
  }

  createNewCall(call: AskForHelp): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/createNewCall`, call, this.options)
  }

  removeRequest(requestnumber: number): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/removeRequest`, { "requestnumber": requestnumber }, this.options)
  }

  getUserRequests(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/getUserRequests`, { params: { password: localStorage.getItem("login") } })
  }
  getVolunteerRequests():
    Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/getVolunteerRequests`, { params: { password: localStorage.getItem("login") } })
  }

  SignIn(userName: string, password: string): Observable<JSON> {
    let data = {
      'password': password,
      'userName': userName
    }
    return this.http.get<JSON>(`${this.url}/api/signIn`, { params: data })
  }

  checkPassword(password: string): Observable<JSON> {
    return this.http.get<JSON>(`${this.url}/api/checkPassword`, { params: { password: password } })
  }

  SignUp(user: User): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/signUp`, user, this.options)

  }
  VolunteerSignUp(volunteersignup: VolunteerSignUp): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/volunteersignup`, volunteersignup, this.options)

  }

  RequestWasGranted(requestNumber: number): Observable<JSON> {
    return this.http.get<JSON>(`${this.url}/api/requestWasGranted`, { params: { requestNumber: requestNumber.toString() } })
  }



}
