import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AskForHelp } from '../models/askForHelp';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class VolunteeringserviceService {

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url = "http://localhost:3000"
  logIn

  constructor(private http: HttpClient) {
    this.logIn = localStorage.getItem("login")

  }



  updateRequestGranted(requestnumber: number): Observable<JSON> {
    return this.http.post<JSON>(`${this.url}/api/updateRequestGranted`, { "requestnumber": requestnumber }, this.options)
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

  RequestWasGranted(requestNumber: number): Observable<JSON> {
    return this.http.get<JSON>(`${this.url}/api/requestWasGranted`, { params: { requestNumber: requestNumber.toString() } })
  }

}
