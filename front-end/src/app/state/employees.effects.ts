import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {EmployeesService} from "../services/employees.service";
import {Employee} from "../models/employee.model";

@Injectable()
export class EmployeesEffects {

  constructor(private actions$: Actions, private emp: EmployeesService)
  {}

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

  loadCities$ = createEffect(() => this.actions$.pipe(
      ofType('[Filters] Load Cities'),
      mergeMap(() => this.emp.getCities()
        .pipe(
          map(cities => ({ type: '[Cities API] Cities Loaded Success', cities })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadDepartments$ = createEffect(() => this.actions$.pipe(
      ofType('[Filters] Load Departments'),
      mergeMap(() => this.emp.getDepartments()
        .pipe(
          map(departments => ({ type: '[Departments API] Departments Loaded Success', departments })),
          catchError(() => EMPTY)
        )
      )
    )
  );


  addEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Add Employee] Add Employee'),
      mergeMap((employee:Employee) => this.emp.addEmployee(employee)
        .pipe(
          map(() => ({ type: '[Employees List] Load Employees'})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Employees List] Delete Employee'),
      mergeMap((id:number) => this.emp.deleteEmployee(id)
        .pipe(
          map(() => ({ type: '[Employees List] Load Employees'})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  filterEmployee$ = createEffect(() => this.actions$.pipe(
      ofType('[Employees List] Filter Employees List'),
      mergeMap((filters:any) => this.emp.getAllEmployees(filters)
        .pipe(
          map((employees) => ({ type: '[Employees API] Employees Loaded Success', employees})),
          catchError(() => EMPTY)
        )
      )
    )
  );

}
