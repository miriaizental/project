import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AskForHelp } from '../models/AskForHelp'
import { User } from '../models/User'


@Injectable({
  providedIn: 'root'
})
export class VolunteeringserviceService {

  options={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  url = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }

  // getRequests(): Observable<AskForHelp[]> {
  //   return this.http.get<AskForHelp[]>(`${this.url}`)
  // }

  postSignIn(userName: string, password: string) {
    return this.http.post<User>(`${this.url}`, { userName, password })
  }
  postSignUp(userName: string, password: string, phone: string, city: string, restriction: string): Observable<User[]> {
    return this.http.post<User>(`${this.url}/api/signUp`, { userName, password, phone, city, restriction},this.options)
  }
}
