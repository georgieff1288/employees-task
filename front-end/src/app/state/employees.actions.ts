import {createAction, props} from '@ngrx/store';
import {Employee} from "../models/employee.model";

export const retrieveEmployees = createAction('[Employees List] Load Employees');
export const loadEmployees = createAction('[Employees API] Employees Loaded Success', props<{ employees: Employee[] }>());
export const addEmployee = createAction('[Add Employee] Add Employee', props<{ employee: Employee }>());