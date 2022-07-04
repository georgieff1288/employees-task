import {createAction, props} from '@ngrx/store';
import {Employee} from "../models/employee.model";
import {City} from "../models/city.model";
import {Department} from "../models/department.model";

export const retrieveEmployees = createAction('[Employees List] Load Employees');
export const loadEmployees = createAction('[Employees API] Employees Loaded Success', props<{ employees: Employee[] }>());
export const addEmployee = createAction('[Add Employee] Add Employee', props<{ employee: Employee }>());
export const deleteEmployee = createAction('[Employees List] Delete Employee', props<{id: number}>());
export const filterEmployees = createAction('[Employees List] Filter Employees List', props<{filters: {}}>());
export const retrieveCities = createAction('[Filters] Load Cities');
export const loadCities = createAction('[Cities API] Cities Loaded Success', props<{ cities: City[] }>());
export const retrieveDepartments = createAction('[Filters] Load Departments');
export const loadDepartments = createAction('[Departments API] Departments Loaded Success', props<{ departments: Department[] }>());
