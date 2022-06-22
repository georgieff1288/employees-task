import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from "rxjs";
import { Employee } from "../../../models/employee.model";

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit, OnDestroy {
  @Output() callbackFunction: EventEmitter<any> = new EventEmitter();
  @Input() employee!: Subject<Employee>;
  employeeForm = new FormGroup({
    employee_name: new FormControl('', [Validators.required]),
    department_id: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
    if(this.employee){
      this.employee.subscribe(res => {
        if(res){
          this.employeeForm.patchValue({
            employee_name: res.employee_name,
            department_id: res.department.department_id.toString(),
            city: res.city,
            street: res.street,
            phone: res.phone
          })
        }
      });
    }
  }
  ngOnDestroy() {
    if(this.employee){
      this.employee.unsubscribe();
    }
  }

  get employee_name() { return this.employeeForm.get('employee_name'); }
  get department_id() { return this.employeeForm.get('department_id'); }
  get city() { return this.employeeForm.get('city'); }
  get street() { return this.employeeForm.get('street'); }
  get phone() { return this.employeeForm.get('phone'); }

  submit(): void {
    let employee: Employee = {
      employee_name: this.employeeForm.value.employee_name!,
      department: {
        department_id: Number(this.employeeForm.value.department_id)
      },
      phone: this.employeeForm.value.phone!,
      city: this.employeeForm.value.city!,
      street:this.employeeForm.value.street!
    }
    this.callbackFunction.emit(employee);
  }
}
