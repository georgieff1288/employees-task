import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isLoggedIn = this.authService.isLoggedIn;
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (isLoggedIn && (err.status == 403 || err.status == 401)) {
        return this.authService.getNewToken().pipe(
          switchMap(() => {
            return next.handle(request);
          }), catchError((err) => {
            this.authService.logout();
            return throwError(err);
          })
        )
      }
      return next.handle(request);
    }))
  }
}
