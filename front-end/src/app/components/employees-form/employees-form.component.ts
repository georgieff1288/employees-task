import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from "../../services/employees.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Employee } from "../../models/employee.model";

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit, OnDestroy {
  id!: number;
  employeeForm = new FormGroup({
    employee_name: new FormControl('', [Validators.required]),
    department_id: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });
  subscription!: Subscription;
  errorMsg: string = '';

  constructor(private emp:EmployeesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.subscription = this.emp.getEmployeeById(this.id).subscribe({
        next: (res:Employee) => {
          if(res){
            this.employeeForm.patchValue({
              employee_name: res.employee_name,
              department_id: '' + res.department.department_id,
              city: res.city,
              street: res.street,
              phone: res.phone
            })
          }
          else{
            this.errorMsg = 'There is no such an employee'
          }
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

  get employee_name() { return this.employeeForm.get('employee_name'); }
  get department_id() { return this.employeeForm.get('department_id'); }
  get city() { return this.employeeForm.get('city'); }
  get street() { return this.employeeForm.get('street'); }
  get phone() { return this.employeeForm.get('phone'); }

  submit(): void {
    let obj = {
      id: 0,
      employee_name: this.employeeForm.value.employee_name!,
      department: {
        department_id: Number(this.employeeForm.value.department_id)
      },
      phone: this.employeeForm.value.phone!,
      city: this.employeeForm.value.city!,
      street:this.employeeForm.value.street!
      }
    if(!this.id){
      this.subscription = this.emp.addEmployee(obj).subscribe({
        next: () => this.router.navigate(['/']),
        error: error => this.errorMsg = error
      })
    }
    else{
      obj.id = this.id;
      this.subscription =this.emp.editEmployee(obj).subscribe({
        next: () => this.router.navigate(['/']),
        error: error => this.errorMsg = error
      })
    }
  }
}
