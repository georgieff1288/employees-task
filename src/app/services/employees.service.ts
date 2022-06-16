import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employee = new BehaviorSubject<any>({});
  addedEmployee = this.employee.asObservable();
  constructor() { }

  addEmployee(emp:Employee){
    this.employee.next(emp);
  }
}
