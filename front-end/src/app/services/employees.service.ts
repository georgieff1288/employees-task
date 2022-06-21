import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private endPoint = "http://localhost:3000/api/employees/";

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.endPoint + 'get-all-employees', { withCredentials: true }).pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.endPoint + 'add-employee', employee, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.endPoint + 'delete-employee/' + id).pipe(catchError(this.handleError));
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
