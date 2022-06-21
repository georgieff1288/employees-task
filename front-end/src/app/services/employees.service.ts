import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  initialEmployees: Employee[] = [
    {id: 1,name:'Ivan Ivanov', department:'Marketing', phone: '359123456789', address:{city:'Ruse', street:'Aleksandrovska'}},
    {id: 2,name:'Maria Petrova', department:'HR', phone: '359666333999', address:{city:'Varna', street:'Nikolaevska'}},
    {id: 3,name:'Georgi Georgiev', department:'Sales', phone: '359123123123', address:{city:'Sofia', street:'Graf Ignatiev'}}
  ];
  private employees = new BehaviorSubject<Employee[]>([...this.initialEmployees]);
  employeesObservable = this.employees.asObservable();
  constructor() { }

  addEmployee(emp: Employee): void {
    emp.id = this.employees.getValue().length + 1;
    this.employees.next([...this.employees.value, emp]);
  }
  deleteEmployee(id: number): void {
    let currentEmployees: Employee[] = this.employees.getValue();
    let result: Employee[] = currentEmployees.filter(obj => obj.id != id);
    this.employees.next(result);
  }
}
