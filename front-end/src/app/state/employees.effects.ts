import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {EmployeesService} from "../services/employees.service";
import {Employee} from "../models/employee.model";
import {Store} from "@ngrx/store";

@Injectable()
export class EmployeesEffects {
  options = {
    city: 'null',
    departmentId: 'null',
    pageSize: 3,
    pageIndex: 0
  }
  constructor(private actions$: Actions, private emp: EmployeesService, private store: Store)
  {}

  loadEmployees$ = createEffect(() => this.actions$.pipe(
      ofType('[Employees List] Load Employees'),
      mergeMap((options: any) => this.emp.getAllEmployees(options)
        .pipe(
          map(res => ({ type: '[Employees API] Employees Loaded Success', res })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadFilters$ = createEffect(() => this.actions$.pipe(
      ofType('[Filters] Load Filters'),
      mergeMap(() => this.emp.getFilters()
        .pipe(
          map(filters => ({ type: '[Filters API] Filters Loaded Success', filters })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Add Employee] Add Employee'),
      mergeMap((employee:Employee) => this.emp.addEmployee(employee)
        .pipe(
          map(() => ({ type: '[Employees List] Load Employees', options: this.options})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Employees List] Delete Employee'),
      mergeMap((id:number) => this.emp.deleteEmployee(id)
        .pipe(
          map(() => ({ type: '[Employees List] Load Employees', options: this.options})),
          catchError(() => EMPTY)
        )
      )
    )
  );

}
