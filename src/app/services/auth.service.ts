import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { User } from '../models/user'
import {ErrorhandlerService} from '../services/errorhandler.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false)
  userId!: Pick<User, "id">; 
  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(

    private http: HttpClient,
    private errorhandlerService: ErrorhandlerService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  SetToken(token: string) {
    this.cookieService.set('chat_token', token);
  }
  

  GetToken() {
    return this.cookieService.get('chat_token');
  }

  DeleteToken() {
    this.cookieService.delete('chat_token');
  }

  GetPayload() {
    const token = this.GetToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
        
    }
    return payload.data
  }

  getuserId() {
      return this.cookieService.get('putang ina mo')
  }
  setUserId(id: any) {
      this.cookieService.set('putang ina mo', id)
  }

  deleteId() {
      this.cookieService.delete('putang ina mo')
  }

// getloggedin(id: any): Observable<any> {
//     return this.http.get(`${this.url}/${id}`)
// }

signup(user: Omit<User, "id">): Observable<User> {
  return this.http
    .post<User>(`${this.url}/signup`, user, this.httpOptions)
    .pipe(
      first(),
     
      catchError(this.errorhandlerService.handleError<User>("signup"))
    );
}


login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
  token: string; userId: Pick<User, "id">
}>  {
return this.http.post(`${this.url}/login`, {email , password}, this.httpOptions)
.pipe(
  
  first(),
  tap((tokenObject: {token: string;   userId: Pick<User, "id"> } | any) => {
   // this.userId = tokenObject.userId;
        
    this.SetToken(tokenObject.token)

     //this.setUserId(tokenObject.userId)
        
        
    
    this.isUserLoggedIn$.next(true)
    this.router.navigate(["home"])


  }, err => {
    console.log(err.error.error.message)
  }),
  
  catchError(this.errorhandlerService.handleError<{
    token: string; userId: Pick<User, "id">;
  }>("login"))
)
}


}
