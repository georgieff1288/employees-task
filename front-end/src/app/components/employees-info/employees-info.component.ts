import {Component, OnDestroy, OnInit} from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-employees-info',
  templateUrl: './employees-info.component.html',
  styleUrls: ['./employees-info.component.scss']
})
export class EmployeesInfoComponent implements OnInit, OnDestroy {
  employeesCounter: number = 0;
  subscription = new Subscription();
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.subscription = this.emp.employeesObservable.subscribe(value => {
      this.employeesCounter = value.length;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
