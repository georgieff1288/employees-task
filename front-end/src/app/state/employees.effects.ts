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
      mergeMap((pageIndex, pageSize) => this.emp.getAllEmployees(pageIndex, pageSize)
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
      mergeMap((filters:any) => this.emp.getAllEmployees(0, 3, filters)
        .pipe(
          map((res) => ({ type: '[Employees API] Employees Loaded Success', res})),
          catchError(() => EMPTY)
        )
      )
    )
  );

}
