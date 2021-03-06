import {createAction, props} from '@ngrx/store';
import {Employee} from "../models/employee.model";

export const retrieveEmployees = createAction('[Employees List] Load Employees', props<{options: any}>());
export const loadEmployees = createAction('[Employees API] Employees Loaded Success', props<{ res: any }>());
export const addEmployee = createAction('[Add Employee] Add Employee', props<{ employee: Employee }>());
export const deleteEmployee = createAction('[Employees List] Delete Employee', props<{id: number}>());
export const retrieveFilters = createAction('[Filters] Load Filters');
export const loadFilters = createAction('[Filters API] Filters Loaded Success', props<{ filters: any }>());
