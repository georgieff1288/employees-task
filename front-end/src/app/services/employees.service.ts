import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private endPoint = "http://localhost:3000/api/employees/";

  // initialEmployees: Employee[] = [
  //   {id: 1,name:'Ivan Ivanov', department:'Marketing', phone: '359123456789', address:{city:'Ruse', street:'Aleksandrovska'}},
  //   {id: 2,name:'Maria Petrova', department:'HR', phone: '359666333999', address:{city:'Varna', street:'Nikolaevska'}},
  //   {id: 3,name:'Georgi Georgiev', department:'Sales', phone: '359123123123', address:{city:'Sofia', street:'Graf Ignatiev'}}
  // ];
  // private employees = new BehaviorSubject<Employee[]>([...this.initialEmployees]);
  // employeesObservable = this.employees.asObservable();
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.endPoint + 'getAllEmployees', { withCredentials: true }).pipe(catchError(this.handleError));
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

  addEmployee(emp: any): void {
    // emp.id = this.employees.getValue().length + 1;
    // this.employees.next([...this.employees.value, emp]);
    console.log(emp)
  }
  deleteEmployee(id: number): void {
    // let currentEmployees: Employee[] = this.employees.getValue();
    // let result: Employee[] = currentEmployees.filter(obj => obj.id != id);
    // this.employees.next(result);
    console.log(id)
  }
}
