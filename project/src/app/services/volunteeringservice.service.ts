import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringserviceService {

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }

  // getRequests(): Observable<AskForHelp[]> {
  //   return this.http.get<AskForHelp[]>(`${this.url}`)
  // }

  // postSignIn(userName: string, password: string) {
  //   return this.http.post<User>(`${this.url}`, { userName, password })
  // }

  checkPassword(password: string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/api/checkPassword`, { params: { password: password} })
  }

  postSignUp(user:User): Observable<string> {
    return this.http.post<string>(`${this.url}/api/signUp`, user, this.options)
  }

}
