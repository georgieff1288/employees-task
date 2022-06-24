import {Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { Employee } from "../../models/employee.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  subscription!: Subscription;
  errorMsg: string = '';
  id!: number;
  employee: Subject<Employee> = new BehaviorSubject<Employee>({}as Employee);
  constructor(private  emp: EmployeesService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.subscription = this.emp.getEmployeeById(this.id).subscribe({
        next: (res:Employee) => {
          this.employee.next(res);
        },
        error: error => this.errorMsg = error
      })
    }
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  editEmployee(employee: Employee){
    this.subscription =this.emp.editEmployee(employee, this.id).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => this.errorMsg = error
    })
  }
}
