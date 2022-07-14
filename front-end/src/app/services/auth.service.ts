import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import {firstValueFrom, from, Observable} from "rxjs";
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

  logout(): Promise<any> {
    let refreshToken = {value: this.cookies.get('refresh-jwt')};
    this.cookies.delete('jwt');
    this.cookies.delete('refresh-jwt');
    this.router.navigate(['login']);
    return firstValueFrom(this.httpService.post(this.baseUrl + 'logout', refreshToken));
  }

  getToken(): string {
    return  this.cookies.get('jwt');
  }

  get isLoggedIn(): boolean {
    let token = this.cookies.get('refresh-jwt');
    if(!token){
      return false
    }
    try {
      let expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      let isExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;
      return !isExpired
    }catch (err){
      return false
    }
    return false;
  }

  getNewToken() {
    let url = this.baseUrl + 'token';
    return from(this.httpService.get(url));
  }
}
