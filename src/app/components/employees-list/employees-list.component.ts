import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Employee } from '../../models/employee.model'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees!: Employee[];
  displayedColumns: string[] = ['name', 'department', 'city', 'address'];
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.employees = this.emp.getEmployees();
  }

}
