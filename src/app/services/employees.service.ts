import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  initialEmployees = [
    {id: 1,name:'Ivan Ivanov', department:'Marketing', phone: 359123456789, address:{city:'Ruse', street:'Aleksandrovska'}},
    {id: 2,name:'Maria Petrova', department:'HR', phone: 359666333999, address:{city:'Varna', street:'Nikolaevska'}},
    {id: 3,name:'Georgi Georgiev', department:'Sales', phone: 359123123123, address:{city:'Sofia', street:'Graf Ignatiev'}}
  ];
  private employees = new BehaviorSubject<any>([...this.initialEmployees]);
  employeesObservable = this.employees.asObservable();
  id:number = 4;
  constructor() { }

  addEmployee(emp: Employee){
    emp.id = this.id;
    this.employees.next([...this.employees.value, emp]);
    this.id++;
  }
  deleteEmployee(id: number){
    let currentEmployees: any[] = this.employees.getValue();
    let result = currentEmployees.filter(obj => obj.id != id);
    this.employees.next(result);
  }
}
