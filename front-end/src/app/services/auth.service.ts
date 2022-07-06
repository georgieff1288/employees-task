import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { from, Observable } from "rxjs";
import { User } from "../models/user.model";
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'auth/';

  constructor(private httpService: HttpService, private router: Router, private cookies: CookieService) { }
  login(user: User): Observable<User>{
    let url = this.baseUrl + 'login';
    return this.httpService.post(url, user);
  }

  logout(): void {
    this.cookies.delete('jwt');
    this.cookies.delete('refresh-jwt');
    this.router.navigate(['login']);
  }

  getToken(): string {
    return  this.cookies.get('jwt');
  }

  get isLoggedIn(): boolean {
    let token = this.cookies.get('refresh-jwt');
    if(!token){
      return false
    }
    let expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    let isExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;
    return !isExpired
  }

  getNewToken() {
    let url = this.baseUrl + 'token';
    return from(this.httpService.get(url));
  }
}
