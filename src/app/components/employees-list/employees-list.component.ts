import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  employees = [
    {name:'Ivan Ivanov', department:'Marketing', phone: 359123456789, address:{city:'Ruse', street:'Aleksandrovska'}},
    {name:'Maria Petrova', department:'HR', phone: 359666333999, address:{city:'Varna', street:'Nikolaevska'}},
    {name:'Georgi Georgiev', department:'Sales', phone: 359123123123, address:{city:'Sofia', street:'Graf Ignatiev'}}
  ];
  displayedColumns: string[] = ['name', 'department', 'phone', 'city', 'address'];
  empSubscription!: Subscription;
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.empSubscription = this.emp.addedEmployee.subscribe((value) => {
      if(value.length>0){
        this.employees.push(...value);
      }
    })
  }
  ngOnDestroy() {
    this.empSubscription.unsubscribe();
  }
}
