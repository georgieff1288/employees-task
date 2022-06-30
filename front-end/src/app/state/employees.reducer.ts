import { createReducer, on } from '@ngrx/store';
import {addEmployee, retrieveEmployees, loadEmployees} from './employees.actions';
import {Employee} from "../models/employee.model";

export const initialState: Employee[] = [];

export const employeesReducer = createReducer(
  initialState,
  on(retrieveEmployees, (state) => state),
  on(loadEmployees, (state, {employees}) => employees),
  on(addEmployee, (state, {employee}) => [employee])
);
