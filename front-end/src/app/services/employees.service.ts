import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl: string = 'employees/';
  numOfEmployees = new BehaviorSubject<number>(0);
  numOfEmployeesObservable = this.numOfEmployees.asObservable();

  constructor(private httpService: HttpService) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpService.get(this.baseUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    console.log(employee)
    return this.httpService.post(this.baseUrl, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    let url = this.baseUrl + id;
    return this.httpService.delete(url);
  }
  getEmployeeById(id: number): Observable<Employee> {
    let url = this.baseUrl + id;
    return this.httpService.get(url);
  }

  editEmployee(employee: Employee, id: number): Observable<Employee> {
    let url = this.baseUrl + id;
    return this.httpService.put(url, employee);
  }
}
