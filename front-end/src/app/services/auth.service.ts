import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
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
    this.router.navigate(['login'])
  }
}
