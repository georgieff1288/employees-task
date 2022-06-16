import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {Employee} from '../../models/employee.model'

@Component({
  selector: 'app-eployees-list',
  templateUrl: './eployees-list.component.html',
  styleUrls: ['./eployees-list.component.scss']
})
export class EployeesListComponent implements OnInit {

  employees!: Employee[];
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.employees = this.emp.getEmployees();
  }

}
