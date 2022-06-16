import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeesService } from "../../services/employees.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent implements OnInit {
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required])
  });

  constructor(private emp:EmployeesService, private router:Router) { }

  ngOnInit(): void {
  }
  get name() { return this.employeeForm.get('name'); }
  get department() { return this.employeeForm.get('department'); }
  get city() { return this.employeeForm.get('city'); }
  get street() { return this.employeeForm.get('street'); }

  addEmployee(){
    let obj = {
      name: this.employeeForm.value.name!,
      department: this.employeeForm.value.department!,
      address: {
        city: this.employeeForm.value.city!,
        street:this.employeeForm.value.street!
      }
    }
    this.emp.addEmployee(obj);
    this.router.navigate(['/']);
  }
}
