import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private endPoint = "http://localhost:3000/api/employees/";
  numOfEmployees = new BehaviorSubject<number>(0);
  numOfEmployeesObservable = this.numOfEmployees.asObservable();

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.endPoint, { withCredentials: true }).pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.endPoint, employee, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.endPoint + id, {withCredentials: true}).pipe(catchError(this.handleError));
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.endPoint + id, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  editEmployee(employee: Employee, id: number): Observable<Employee> {
    return this.http.put<Employee>(this.endPoint + 'edit/' + id, employee, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.status === 0) {
      errorMsg =  'Server error';
    } else {
      errorMsg = error.error.message
    }
    return throwError(() => new Error(errorMsg));
  }
}
