import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {EmployeesService} from "../services/employees.service";

@Injectable()
export class EmployeesEffects {

  loadEmployees$ = createEffect(() => this.actions$.pipe(
      ofType('[Employees List] Load Employees'),
      mergeMap(() => this.emp.getAllEmployees()
        .pipe(
          map(employees => ({ type: '[Employees API] Employees Loaded Success', employees })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Add Employee] Add Employee'),
      mergeMap(employee => this.emp.addEmployee(employee)
        .pipe(
          map(() => ({ type: '[Employees List] Load Employees'})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private emp: EmployeesService)
  {}
}
