import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {Employee} from "../../models/employee.model";

@Component({
  selector: 'app-employees-info',
  templateUrl: './employees-info.component.html',
  styleUrls: ['./employees-info.component.scss']
})
export class EmployeesInfoComponent implements OnInit, OnDestroy {
  // employeesCounter: number = 0;
  employeesCounter = this.store.select('employees');
  subscription = new Subscription();
  constructor(private emp: EmployeesService, private store: Store<{employees: Employee[]}>) { }

  ngOnInit(): void {
    // this.subscription = this.emp.numOfEmployeesObservable.subscribe(
    //   res => this.employeesCounter = res
    // )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
