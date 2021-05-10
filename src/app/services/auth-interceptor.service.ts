import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http'


import {Observable} from "rxjs"
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private tokenService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.tokenService.GetToken() 
  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    })
    
    return next.handle(clonedRequest)
  } else {
    return next.handle(req)
  }

}


}

// import { AuthService } from './auth.service';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptorService implements HttpInterceptor {
//   constructor(private tokenService: AuthService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const headersConfig = {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     };
//     const token = this.tokenService.GetToken();
//     if (token) {
//       headersConfig['Authorization']   = `beader ${token}`;
//     }
//     const _req = req.clone({ setHeaders: headersConfig });
//     return next.handle(_req);
//   }
// }
