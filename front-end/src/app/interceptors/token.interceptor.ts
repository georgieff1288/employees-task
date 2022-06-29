import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, firstValueFrom, from, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isLoggedIn = this.authService.isLoggedIn;
    return next.handle(request).pipe(catchError(err => {
      if(isLoggedIn){
        if(err.status == 403 || err.status == 401){
          from(this.handleError(request, next))
        }
      }
      return next.handle(request);
    }))
  }
  async handleError(request: HttpRequest<any>, next: HttpHandler){
    await this.authService.getNewToken();
    return firstValueFrom(next.handle(request));
  }
}
