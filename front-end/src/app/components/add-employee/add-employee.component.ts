import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Router } from "@angular/router";
import { Employee } from "../../models/employee.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  errorMsg: string = '';
  constructor(private emp:EmployeesService, private router:Router) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  addEmployee (employee: Employee) {
    this.subscription = this.emp.addEmployee(employee).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => this.errorMsg = error
    });
  }
}
