import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employeesList = [{name:'Ivan Ivanov', department:'Marketing', address:{city:'Ruse', street:'Aleksandrovska'}},
    {name:'Maria Petrova', department:'HR', address:{city:'Varna', street:'Nikolaevska'}},
    {name:'Georgi Georgiev', department:'Sales', address:{city:'Sofia', street:'Graf Ignatiev'}}];
  constructor() { }

  getEmployees(){
    return this.employeesList;
  }
}
