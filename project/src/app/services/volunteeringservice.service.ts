import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AskForHelp } from '../models/askForHelp';
import { JsonPipe } from '@angular/common';
import { VolunteerSignUp } from '../models/VolunteerSignUp';
import { ManagerSignUp } from '../models/Managersignup';
import { Statistics } from '../models/statistics'
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
  role
  ipAddress
  coordinates: any;
  lat
  lng


  constructor(private http: HttpClient) {
    this.logIn = localStorage.getItem("login")
    this.role = localStorage.getItem("role")
    this.http.get('https://jsonip.com').subscribe((ipOfNetwork) => {
      this.ipAddress = ipOfNetwork['ip']
      console.log("ip:", this.ipAddress);

    })
    //this.ipAddress=localStorage.getItem("ipaddress")


  }

  ///////////////
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
        //resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });


      },
        err => {
          reject(err);
        });
    });

  }


  /////////////////////////////////////////////////////////////////////////////////




  updateRequestGranted(requestnumber: number): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/updateRequestGranted`, { "requestnumber": requestnumber, "login": this.logIn }, this.options)
  }
  updateResponseDate(requestnumber: number): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/updateResponseDate`, { "requestnumber": requestnumber }, this.options)
  }

<<<<<<< HEAD
  getAllRequests(): Observable<AskForHelp[]> {
    var x = this.ipAddress
    console.log('ipa', x);
    this.getPosition()
    console.log('p', this.lat, this.lng);
    let position = {
      'lat': this.lat,
      'lng': this.lng
      
    }

    return this.http.get<AskForHelp[]>(`${this.url}/api/allRequests`,{params:position})
=======
  getAllRequests(ip:string): Observable<AskForHelp[]> {
    console.log('ipa', ip);
    
    return this.http.get<AskForHelp[]>(`${this.url}/api/allRequests`, { params: { ipAddress: ip } })
>>>>>>> e177c7da551139bc7fa582e0a7761031d85bdecf
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
  getVolunteerRequests(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/getVolunteerRequests`, { params: { password: localStorage.getItem("login") } })
  }
  managerAuthentication(): Observable<Array<Object>> {

    return this.http.get<Array<Object>>(`${this.url}/api/managerAuthentication`, { params: { password: localStorage.getItem("login") } })
  }

  SignIn(userName: string, password: string, type: string): Observable<JSON> {
    let data = {
      'password': password,
      'userName': userName,
      'type': type
    }
    return this.http.get<JSON>(`${this.url}/api/signIn`, { params: data })
  }

  checkPassword(password: string, number: number): Observable<JSON> {
    let data = {
      'password': password,
      'number': number.toString()
    }
    return this.http.get<JSON>(`${this.url}/api/checkPassword`, { params: data })
  }


  SignUp(user: User): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/signUp`, user, this.options)

  }
  VolunteerSignUp(volunteersignup: VolunteerSignUp): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/volunteersignup`, volunteersignup, this.options)

  }
  ManagerSignup(managersignup: ManagerSignUp): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/managersignup`, managersignup, this.options)
  }

  RequestWasGranted(requestNumber: number): Observable<JSON> {
    return this.http.get<JSON>(`${this.url}/api/requestWasGranted`, { params: { requestNumber: requestNumber.toString() } })
  }

  ContactUs(password: string): Observable<JSON> {
    let data = {
      'password': this.logIn,
      'type': this.role,
      'pass': password
    }
    return this.http.get<JSON>(`${this.url}/api/contactUs`, { params: data })

  }
  sendfeedback(data: Statistics): Observable<JSON> {
    //console.log('d', data);

    return this.http.post<JSON>(`${this.url}/api/AddFeedBack`, data, this.options)
  }
  GetCities(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/getCities`)
  }

  TypesOfLimitations(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/typesOfLimitations`)
  }

  Satisfaction(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(`${this.url}/api/satisfaction`)
  }
  ResponseTime():Observable<Array<Object>> {
    
    return this.http.get<Array<Object>>(`${this.url}/api/responseTime`)

  }

}
