import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  retrieveEmployees,
  loadEmployees,
  deleteEmployee,
  filterEmployees,
  retrieveCities, loadCities, retrieveDepartments, loadDepartments
} from './employees.actions';
import {Employee} from "../models/employee.model";
import {City} from "../models/city.model";
import {Department} from "../models/department.model";

export interface State {
  employees: Employee[],
  cities: City[],
  departments: Department[]
}

export const initialState: State = {
  employees: [],
  cities: [],
  departments: []
};

export const employeesReducer = createReducer(
  initialState,
  on(retrieveEmployees, (state) => state),
  on(loadEmployees, (state, {employees}) => ({...state, employees: employees})),
  on(addEmployee, (state, employee) => state),
  on(deleteEmployee, (state, id) => state),
  on(filterEmployees, (state, filters) => state),
  on(retrieveCities, (state) => state),
  on(loadCities, (state, {cities}) => ({...state, cities: cities})),
  on(retrieveDepartments, (state) => state),
  on(loadDepartments, (state, {departments}) => ({...state, departments: departments})),
);
