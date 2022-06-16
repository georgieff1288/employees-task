import {Component, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees = [{name:'Ivan Ivanov', department:'Marketing', address:{city:'Ruse', street:'Aleksandrovska'}},
    {name:'Maria Petrova', department:'HR', address:{city:'Varna', street:'Nikolaevska'}},
    {name:'Georgi Georgiev', department:'Sales', address:{city:'Sofia', street:'Graf Ignatiev'}}];
  displayedColumns: string[] = ['name', 'department', 'city', 'address'];
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.emp.addedEmployee.subscribe((value) => {
      if(value.length>0){
        this.employees.push(...value);
      }
    })
  }
}
