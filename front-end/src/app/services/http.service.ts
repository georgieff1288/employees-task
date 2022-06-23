import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Employee } from "../models/employee.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiURL = environment.apiURL;

  constructor( private http: HttpClient ) { }

  get(url: string): any {
    return this.http.get<any>(this.apiURL + url, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  post(url: string, args: any): any {
    return this.http.post<any>(this.apiURL + url, args, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  put(url: string, args: any): any {
    return this.http.put<any>(this.apiURL + url, args, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  delete(url: string): any {
    return this.http.delete<any>(this.apiURL + url, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.status === 0) {
      errorMsg = 'Server error';
    } else {
      errorMsg = error.error.message
    }
    return throwError(() => new Error(errorMsg));
  }
}
