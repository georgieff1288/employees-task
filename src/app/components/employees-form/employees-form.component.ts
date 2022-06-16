import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }
  get name() { return this.employeeForm.get('name'); }
  get department() { return this.employeeForm.get('department'); }
  get city() { return this.employeeForm.get('city'); }
  get street() { return this.employeeForm.get('street'); }

  addEmployee(){
    console.log(this.employeeForm.value)
  }
}
