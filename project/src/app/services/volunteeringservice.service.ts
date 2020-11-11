import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AskForHelp } from '../models/askForHelp';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringserviceService {

  logIn:string

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url = "http://localhost:3000"
  constructor(private http: HttpClient) {
    this.logIn=''
  }

  getAllRequests(): Observable<AskForHelp[]> {
    return this.http.get<AskForHelp[]>(`${this.url}/api/allRequests`)
  }

  createNewCall(call:AskForHelp):Observable<string>{
    return this.http.post<string>(`${this.url}/api/createNewCall`, call, this.options)
  }


  SignIn(userName: string, password: string) : Observable<boolean>{
    let data={
      'password':password,
      'userName':userName
    }
    return this.http.get<boolean>(`${this.url}/api/signIn`,  { params:  data})
  }

  checkPassword(password: string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/api/checkPassword`, { params: { password: password} })
  }

  SignUp(user:User): Observable<string> {
    return this.http.post<string>(`${this.url}/api/signUp`, user, this.options)
  }

}
