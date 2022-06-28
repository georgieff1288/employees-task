import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request.clone();
    return next.handle(request).pipe(catchError(err => {
      if(err.status == 403 || err.status == 401){
        this.authService.getNewToken().then((res) => {
          console.log(res)
        });
        return next.handle(req);
      }
      return next.handle(req);
    }))
  }
}
