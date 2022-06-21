import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from "../../services/employees.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  employeeForm = new FormGroup({
    employee_name: new FormControl('', [Validators.required]),
    department_id: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });
  subscription!: Subscription;
  errorMsg: string = '';

  constructor(private emp:EmployeesService, private router:Router) { }

  ngOnInit(): void {
  }
  get employee_name() { return this.employeeForm.get('employee_name'); }
  get department_id() { return this.employeeForm.get('department_id'); }
  get city() { return this.employeeForm.get('city'); }
  get street() { return this.employeeForm.get('street'); }
  get phone() { return this.employeeForm.get('phone'); }

  addEmployee(): void {
    let obj = {
      employee_name: this.employeeForm.value.employee_name!,
      department: {
        department_id: Number(this.employeeForm.value.department_id)
      },
      phone: this.employeeForm.value.phone!,
      city: this.employeeForm.value.city!,
      street:this.employeeForm.value.street!
      }
    this.subscription = this.emp.addEmployee(obj).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => this.errorMsg = error
    })
  }
}
